/**
 * Test: Follow Up Boss API Client
 * Critical path: CRM integration with rate limiting
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { FollowUpBossClient } from "./client";

// Mock fetch
global.fetch = vi.fn();

function createClient(overrides = {}) {
  return new FollowUpBossClient({
    apiKey: "test-api-key",
    enableRateLimiting: false,
    retryAttempts: 0,
    ...overrides,
  });
}

describe("FUB Client", () => {
  beforeEach(() => {
    // resetAllMocks also removes persistent implementations (mockResolvedValue)
    vi.resetAllMocks();
  });

  it("creates (upserts) a person successfully", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 123,
        name: "John Doe",
        emails: [{ value: "john@example.com" }],
      }),
    });

    const client = createClient();
    const result = await client.upsertPerson({
      name: "John Doe",
      emails: [{ value: "john@example.com" }],
      phones: [{ value: "7025551234" }],
    });

    expect(result.id).toBe(123);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/people"),
      expect.objectContaining({
        method: "PUT",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      }),
    );
  });

  it("normalizes string emails and phones on upsert", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 456 }),
    });

    const client = createClient();
    await client.upsertPerson({
      name: "Jane Smith",
      emails: ["jane@example.com"],
      phones: ["7025551234"],
    });

    const callArg = (global.fetch as any).mock.calls[0][1];
    const bodyData = JSON.parse(callArg.body);

    expect(bodyData.emails).toEqual([{ value: "jane@example.com" }]);
    expect(bodyData.phones).toEqual([{ value: "7025551234" }]);
  });

  it("handles rate limiting (429) with retry", async () => {
    (global.fetch as any)
      .mockResolvedValueOnce({
        ok: false,
        status: 429,
        headers: {
          get: (name: string) => (name === "Retry-After" ? "0" : null),
        },
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 123 }),
      });

    const client = createClient({ retryAttempts: 1 });
    const result = await client.upsertPerson({ name: "John Doe" });

    // Should succeed after retry
    expect(result.id).toBe(123);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it("caches GET requests", async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({
        people: [{ id: 1, emails: [{ value: "cached@example.com" }] }],
      }),
    });

    const client = createClient();

    // First call
    await client.listPeople({ email: "cached@example.com" });

    // Second call (should use cache)
    await client.listPeople({ email: "cached@example.com" });

    // Fetch should only be called once (second call used cache)
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("handles API errors gracefully", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      json: async () => ({ message: "Internal server error" }),
    });

    const client = createClient();

    await expect(client.upsertPerson({ name: "John Doe" })).rejects.toThrow(
      /FUB API Error \(500\)/,
    );
  });

  it("includes custom fields in person creation", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 789 }),
    });

    const client = createClient();
    await client.upsertPerson({
      name: "Jane Smith",
      emails: ["jane@example.com"],
      customFields: {
        priceMin: 400000,
        priceMax: 600000,
        bedrooms: 3,
        source: "website-hero",
      },
    });

    const callArg = (global.fetch as any).mock.calls[0][1];
    const bodyData = JSON.parse(callArg.body);

    expect(bodyData.customFields).toBeDefined();
    expect(bodyData.customFields.priceMin).toBe(400000);
    expect(bodyData.customFields.source).toBe("website-hero");
  });

  it("adds tags to a person", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const client = createClient();
    await client.addTag(123, "website-lead");

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/people/123/tags"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ tag: "website-lead" }),
      }),
    );
  });

  it("finds a person by email", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        people: [{ id: 111, emails: [{ value: "john@example.com" }] }],
      }),
    });

    const client = createClient();
    const person = await client.findPerson({ email: "john@example.com" });

    expect(person?.id).toBe(111);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("email=john%40example.com"),
      expect.anything(),
    );
  });

  it("returns null when no person matches", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ people: [] }),
    });

    const client = createClient();
    const person = await client.findPerson({ email: "nobody@example.com" });

    expect(person).toBeNull();
  });

  it("creates events", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "event-1" }),
    });

    const client = createClient();
    const result = await client.createEvent({
      source: "website",
      type: "Inbound Lead",
      message: "Lead message: hello",
      personId: 123,
    });

    expect(result.id).toBe("event-1");
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/events"),
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("retries on network errors", async () => {
    (global.fetch as any)
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 123 }),
      });

    const client = createClient({ retryAttempts: 1 });
    const result = await client.upsertPerson({ name: "John Doe" });

    expect(result.id).toBe(123);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  }, 10000);

  it("sends Basic auth and system key headers", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 123 }),
    });

    const client = createClient({ systemKey: "system-key-abc" });
    await client.upsertPerson({ name: "John Doe" });

    const callArg = (global.fetch as any).mock.calls[0][1];
    expect(callArg.headers.Authorization).toMatch(/^Basic /);
    expect(callArg.headers["X-System-Key"]).toBe("system-key-abc");
  });
});
