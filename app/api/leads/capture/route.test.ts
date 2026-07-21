/**
 * Test: /api/leads/capture Route Handler
 * Critical path: Lead generation API endpoint
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import type { NextRequest } from "next/server";
import { POST } from "./route";

const { mockFindPerson, mockUpsertPerson, mockAddTag, mockCreateEvent } =
  vi.hoisted(() => ({
    mockFindPerson: vi.fn(),
    mockUpsertPerson: vi.fn(),
    mockAddTag: vi.fn(),
    mockCreateEvent: vi.fn(),
  }));

// Mock FUB client class used by the route
vi.mock("@/lib/fub/client", () => ({
  FollowUpBossClient: class {
    findPerson = mockFindPerson;
    upsertPerson = mockUpsertPerson;
    addTag = mockAddTag;
    createEvent = mockCreateEvent;
  },
}));

function makeRequest(body: Record<string, unknown>): NextRequest {
  return new Request("http://localhost:3000/api/leads/capture", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }) as unknown as NextRequest;
}

describe("POST /api/leads/capture", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFindPerson.mockResolvedValue(null);
    mockUpsertPerson.mockResolvedValue({ id: 123 });
    mockAddTag.mockResolvedValue(undefined);
    mockCreateEvent.mockResolvedValue({ id: "event-1" });
  });

  it("creates lead with valid data", async () => {
    const response = await POST(
      makeRequest({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "7025551234",
        message: "Interested in buying",
        source: "website-form",
        stage: "New Lead",
        tags: ["website"],
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.personId).toBe(123);
    expect(data.isNew).toBe(true);
    expect(mockUpsertPerson).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "John Doe",
        emails: [{ value: "john@example.com" }],
        phones: [{ value: "7025551234" }],
        stage: "New Lead",
      }),
    );
  });

  it("returns 400 when email and phone are missing", async () => {
    const response = await POST(
      makeRequest({
        firstName: "John",
        lastName: "Doe",
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("required");
    expect(mockUpsertPerson).not.toHaveBeenCalled();
  });

  it("returns 400 when name is missing", async () => {
    const response = await POST(
      makeRequest({
        email: "john@example.com",
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("required");
    expect(mockUpsertPerson).not.toHaveBeenCalled();
  });

  it("handles FUB API errors gracefully", async () => {
    mockUpsertPerson.mockRejectedValueOnce(new Error("FUB API unavailable"));

    const response = await POST(
      makeRequest({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBeDefined();
  });

  it("enriches lead with source, stage, and tags", async () => {
    const response = await POST(
      makeRequest({
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        source: "hero-section",
        stage: "Hot Lead",
        tags: ["website", "hero-cta", "q1-2026"],
      }),
    );

    expect(response.status).toBe(200);
    expect(mockUpsertPerson).toHaveBeenCalledWith(
      expect.objectContaining({
        stage: "Hot Lead",
      }),
    );

    const addedTags = mockAddTag.mock.calls.map((call) => call[1]);
    expect(addedTags).toEqual(
      expect.arrayContaining([
        "website",
        "hero-cta",
        "q1-2026",
        "website-lead",
      ]),
    );
  });

  it("handles property search criteria", async () => {
    const response = await POST(
      makeRequest({
        firstName: "Buyer",
        lastName: "Jones",
        email: "buyer@example.com",
        priceMin: 400000,
        priceMax: 600000,
        bedrooms: 3,
        bathrooms: 2.5,
        timeline: "1-3 months",
        preApproved: true,
      }),
    );

    expect(response.status).toBe(200);
    expect(mockUpsertPerson).toHaveBeenCalledWith(
      expect.objectContaining({
        customFields: expect.objectContaining({
          priceMin: 400000,
          priceMax: 600000,
          bedrooms: 3,
          bathrooms: 2.5,
          timeline: "1-3 months",
          preApproved: true,
        }),
      }),
    );

    // Property search should log a search-criteria event
    expect(mockCreateEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "Property Search",
      }),
    );
  });

  it("detects duplicate leads via findPerson", async () => {
    mockFindPerson.mockResolvedValueOnce({ id: 999 });
    mockUpsertPerson.mockResolvedValueOnce({ id: 999 });

    const response = await POST(
      makeRequest({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.isNew).toBe(false);
    expect(data.message).toContain("updated");
    expect(mockFindPerson).toHaveBeenCalledWith({ email: "john@example.com" });
  });

  it("creates an inbound-lead event when a message is provided", async () => {
    await POST(
      makeRequest({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        message: "Please call me",
      }),
    );

    expect(mockCreateEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "Inbound Lead",
        message: expect.stringContaining("Please call me"),
        personId: 123,
      }),
    );
  });
});
