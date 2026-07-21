/**
 * Test: Claude API Rate Limiting Middleware
 * Critical path: AI API cost control and rate limiting
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { claudeRateLimit, rateLimitStore } from "./claude-rate-limit";

function makeRequest(ip: string): NextRequest {
  return new NextRequest("http://localhost:3000/api/claude/chat", {
    headers: { "x-forwarded-for": ip },
  });
}

describe("Claude Rate Limiting", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("allows requests within rate limit", async () => {
    const result = await claudeRateLimit(makeRequest("10.0.0.1"), {
      requestsPerMinute: 5,
    });

    // null means the request is allowed to proceed
    expect(result).toBeNull();
  });

  it("blocks requests exceeding rate limit with a 429", async () => {
    const ip = "10.0.0.2";

    for (let i = 0; i < 3; i++) {
      const allowed = await claudeRateLimit(makeRequest(ip), {
        requestsPerMinute: 3,
      });
      expect(allowed).toBeNull();
    }

    const blocked = await claudeRateLimit(makeRequest(ip), {
      requestsPerMinute: 3,
    });

    expect(blocked).not.toBeNull();
    expect(blocked!.status).toBe(429);

    const body = await blocked!.json();
    expect(body.error).toBe("Rate limit exceeded");
    expect(body.retryAfter).toBeGreaterThan(0);
    expect(blocked!.headers.get("Retry-After")).toBeDefined();
    expect(blocked!.headers.get("X-RateLimit-Remaining")).toBe("0");
  });

  it("tracks different clients separately", async () => {
    const limit = { requestsPerMinute: 2 };

    // Exhaust client A's limit
    await claudeRateLimit(makeRequest("10.0.1.1"), limit);
    await claudeRateLimit(makeRequest("10.0.1.1"), limit);
    const blockedA = await claudeRateLimit(makeRequest("10.0.1.1"), limit);
    expect(blockedA).not.toBeNull();
    expect(blockedA!.status).toBe(429);

    // Client B should still be allowed
    const allowedB = await claudeRateLimit(makeRequest("10.0.1.2"), limit);
    expect(allowedB).toBeNull();
  });

  it("resets after the time window passes", async () => {
    const ip = "10.0.2.1";
    const limit = { requestsPerMinute: 2 };

    await claudeRateLimit(makeRequest(ip), limit);
    await claudeRateLimit(makeRequest(ip), limit);

    const blocked = await claudeRateLimit(makeRequest(ip), limit);
    expect(blocked).not.toBeNull();

    // Advance past the 60-second window
    vi.advanceTimersByTime(61000);

    const allowed = await claudeRateLimit(makeRequest(ip), limit);
    expect(allowed).toBeNull();
  });

  it("provides retry-after time no greater than the window", async () => {
    const ip = "10.0.3.1";
    const limit = { requestsPerMinute: 1 };

    await claudeRateLimit(makeRequest(ip), limit);
    const blocked = await claudeRateLimit(makeRequest(ip), limit);

    expect(blocked).not.toBeNull();
    const retryAfter = parseInt(blocked!.headers.get("Retry-After")!, 10);
    expect(retryAfter).toBeGreaterThan(0);
    expect(retryAfter).toBeLessThanOrEqual(60);
  });

  it("can be disabled via config", async () => {
    const ip = "10.0.4.1";
    const config = { requestsPerMinute: 1, enabled: false };

    // Even repeated requests are allowed when disabled
    for (let i = 0; i < 5; i++) {
      const result = await claudeRateLimit(makeRequest(ip), config);
      expect(result).toBeNull();
    }
  });

  it('falls back to "unknown" client when no IP headers exist', async () => {
    const request = new NextRequest("http://localhost:3000/api/claude/chat");

    const result = await claudeRateLimit(request, { requestsPerMinute: 100 });
    expect(result).toBeNull();

    const usage = rateLimitStore.getUsage("unknown");
    expect(usage.requestsLastMinute).toBeGreaterThan(0);
  });

  it("tracks token usage per client", async () => {
    rateLimitStore.trackTokens("token-client", 500);

    const usage = rateLimitStore.getUsage("token-client");
    expect(usage.tokensLastMinute).toBeGreaterThan(0);
  });

  it("reports usage stats for monitoring", async () => {
    const ip = "10.0.5.1";
    await claudeRateLimit(makeRequest(ip), { requestsPerMinute: 10 });
    await claudeRateLimit(makeRequest(ip), { requestsPerMinute: 10 });

    const usage = rateLimitStore.getUsage(ip);
    expect(usage).toHaveProperty("requestsLastMinute");
    expect(usage).toHaveProperty("tokensLastMinute");
    expect(usage.requestsLastMinute).toBe(2);
  });

  it("cleans up stale entries", async () => {
    const ip = "10.0.6.1";
    await claudeRateLimit(makeRequest(ip), { requestsPerMinute: 10 });

    // Advance past the one-hour cleanup horizon
    vi.advanceTimersByTime(3600001);
    rateLimitStore.cleanup();

    const usage = rateLimitStore.getUsage(ip);
    expect(usage.requestsLastMinute).toBe(0);
  });
});
