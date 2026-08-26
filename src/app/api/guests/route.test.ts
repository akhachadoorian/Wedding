// @vitest-environment node
import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/airtable", () => ({
    listRecords: vi.fn(),
}));

import { listRecords } from "@/lib/airtable";
import { GET } from "./route";

const mockListRecords = vi.mocked(listRecords);

function makeRequest(query = "") {
    return new NextRequest(`http://localhost/api/guests${query}`);
}

beforeEach(() => {
    vi.stubEnv("NODE_ENV", "test");
});

afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
});

describe("GET /api/guests — dev error escape hatch", () => {
    it("returns a forced 500 for ?error=1 with no `success` key (asymmetric with /api/rsvp's {success:false} shape)", async () => {
        const res = await GET(makeRequest("?error=1"));
        const json = await res.json();

        expect(res.status).toBe(500);
        expect(json).toEqual({ error: "Forced error for testing" });
        expect("success" in json).toBe(false);
        expect(mockListRecords).not.toHaveBeenCalled();
    });

    it("is disabled in production and falls through to normal handling", async () => {
        vi.stubEnv("NODE_ENV", "production");
        mockListRecords.mockImplementation(async (table: string) =>
            table === "Guests" ? [] : [],
        );

        const res = await GET(makeRequest("?error=1"));
        const json = await res.json();

        expect(res.status).toBe(200);
        expect(json).toEqual([]);
    });
});

describe("GET /api/guests — success", () => {
    it("returns the correctly-shaped party array and calls both tables via Promise.all", async () => {
        mockListRecords.mockImplementation(async (table: string) => {
            if (table === "Guests") {
                return [
                    { id: "recGuest1", fields: { firstName: "Jane", lastName: "Doe", fullName: "Jane Doe" } },
                    { id: "recGuest2", fields: { firstName: "John", lastName: "Doe", fullName: "John Doe" } },
                ];
            }
            if (table === "Parties") {
                return [{ id: "recParty1", fields: { id: 42, guests: ["recGuest1", "recGuest2"] } }];
            }
            throw new Error(`unexpected table ${table}`);
        });

        const res = await GET(makeRequest());
        const json = await res.json();

        expect(res.status).toBe(200);
        expect(json).toEqual([
            {
                id: "42",
                guest1: expect.objectContaining({ firstName: "Jane", lastName: "Doe" }),
                guest2: expect.objectContaining({ firstName: "John", lastName: "Doe" }),
            },
        ]);
        expect(mockListRecords).toHaveBeenCalledWith("Guests");
        expect(mockListRecords).toHaveBeenCalledWith("Parties");
    });

    it("coerces the party's numeric Airtable id field to a string", async () => {
        mockListRecords.mockImplementation(async (table: string) => {
            if (table === "Guests") {
                return [{ id: "recGuest1", fields: { firstName: "A", lastName: "B", fullName: "A B" } }];
            }
            return [{ id: "recParty1", fields: { id: 7, guests: ["recGuest1"] } }];
        });

        const res = await GET(makeRequest());
        const json = await res.json();

        expect(json[0].id).toBe("7");
        expect(typeof json[0].id).toBe("string");
    });

    it("sanitizes an invalid rehearsalMixer value to undefined instead of passing it through", async () => {
        mockListRecords.mockImplementation(async (table: string) => {
            if (table === "Guests") {
                return [
                    {
                        id: "recGuest1",
                        fields: { firstName: "A", lastName: "B", fullName: "A B", rehearsalMixer: "maybe" },
                    },
                ];
            }
            return [{ id: "recParty1", fields: { id: 1, guests: ["recGuest1"] } }];
        });

        const res = await GET(makeRequest());
        const json = await res.json();

        expect(json[0].guest1.rehearsalMixer).toBeUndefined();
    });

    it("passes through a valid rehearsalMixer value unchanged", async () => {
        mockListRecords.mockImplementation(async (table: string) => {
            if (table === "Guests") {
                return [
                    {
                        id: "recGuest1",
                        fields: { firstName: "A", lastName: "B", fullName: "A B", rehearsalMixer: "attending" },
                    },
                ];
            }
            return [{ id: "recParty1", fields: { id: 1, guests: ["recGuest1"] } }];
        });

        const res = await GET(makeRequest());
        const json = await res.json();

        expect(json[0].guest1.rehearsalMixer).toBe("attending");
    });

    it("silently skips a party whose guest1 can't be resolved, while keeping sibling valid parties", async () => {
        mockListRecords.mockImplementation(async (table: string) => {
            if (table === "Guests") {
                return [{ id: "recGuestValid", fields: { firstName: "Valid", lastName: "Guest", fullName: "Valid Guest" } }];
            }
            return [
                // guest1Id points at a guest record that doesn't exist in the Guests table.
                { id: "recPartyBroken", fields: { id: 1, guests: ["recGuestMissing"] } },
                { id: "recPartyValid", fields: { id: 2, guests: ["recGuestValid"] } },
            ];
        });

        const res = await GET(makeRequest());
        const json = await res.json();

        expect(json).toHaveLength(1);
        expect(json[0].id).toBe("2");
    });

    it("omits guest2 when the party has no guest2Id at all", async () => {
        mockListRecords.mockImplementation(async (table: string) => {
            if (table === "Guests") {
                return [{ id: "recGuest1", fields: { firstName: "A", lastName: "B", fullName: "A B" } }];
            }
            return [{ id: "recParty1", fields: { id: 1, guests: ["recGuest1"] } }];
        });

        const res = await GET(makeRequest());
        const json = await res.json();

        expect(json[0]).not.toHaveProperty("guest2");
    });

    it("omits guest2 when the party has a guest2Id but it isn't resolvable in the guest map", async () => {
        mockListRecords.mockImplementation(async (table: string) => {
            if (table === "Guests") {
                return [{ id: "recGuest1", fields: { firstName: "A", lastName: "B", fullName: "A B" } }];
            }
            return [{ id: "recParty1", fields: { id: 1, guests: ["recGuest1", "recGuestMissing"] } }];
        });

        const res = await GET(makeRequest());
        const json = await res.json();

        expect(json[0]).not.toHaveProperty("guest2");
    });
});

describe("GET /api/guests — failures", () => {
    it("returns 500 with no `success` key when a table fetch rejects", async () => {
        mockListRecords.mockRejectedValue(new Error("airtable down"));

        const res = await GET(makeRequest());
        const json = await res.json();

        expect(res.status).toBe(500);
        expect(json).toEqual({ error: "Failed to fetch guests" });
        expect("success" in json).toBe(false);
    });
});
