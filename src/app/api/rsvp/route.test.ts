// @vitest-environment node
import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/airtable", () => ({
    findRecordByNumberField: vi.fn(),
    getRecord: vi.fn(),
    updateRecord: vi.fn(),
}));

import { findRecordByNumberField, getRecord, updateRecord } from "@/lib/airtable";
import { POST } from "./route";

const mockFindRecordByNumberField = vi.mocked(findRecordByNumberField);
const mockGetRecord = vi.mocked(getRecord);
const mockUpdateRecord = vi.mocked(updateRecord);

function makeRequest(body: unknown, query = "") {
    return new NextRequest(`http://localhost/api/rsvp${query}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
}

function makeRawRequest(rawBody: string, query = "") {
    return new NextRequest(`http://localhost/api/rsvp${query}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: rawBody,
    });
}

const guest1 = { firstName: "Jane", lastName: "Doe" };
const guest2 = { firstName: "John", lastName: "Doe" };

const attendingMeal = { selectedEntree: "steak", dietaryNotes: "none" };
const attendingTransportation = { ridingBus: "riding", stayingAt: "homewoodSuites" };

function singleGuestBody(overrides: {
    id?: unknown;
    attendance?: unknown;
    meal?: unknown;
    transportation?: unknown;
    rehearsalMixer?: unknown;
} = {}) {
    return {
        party: { id: overrides.id ?? "42", guest1 },
        draft: {
            attendance: overrides.attendance ?? { guest1: "attending" },
            meal: overrides.meal ?? { guest1: attendingMeal },
            transportation: overrides.transportation ?? { guest1: attendingTransportation },
            rehearsalMixer: overrides.rehearsalMixer ?? { guest1: "attending" },
        },
    };
}

function twoGuestBody() {
    return {
        party: { id: "42", guest1, guest2 },
        draft: {
            attendance: { guest1: "attending", guest2: "attending" },
            meal: { guest1: attendingMeal, guest2: attendingMeal },
            transportation: { guest1: attendingTransportation, guest2: attendingTransportation },
            rehearsalMixer: { guest1: "attending", guest2: "attending" },
        },
    };
}

const partyRecord = {
    id: "recParty1",
    fields: { id: 42, guests: ["recGuest1", "recGuest2"] },
};

const guest1Record = {
    id: "recGuest1",
    fields: { firstName: "Jane", lastName: "Doe", fullName: "Jane Doe" },
};

const guest2Record = {
    id: "recGuest2",
    fields: { firstName: "John", lastName: "Doe", fullName: "John Doe" },
};

beforeEach(() => {
    vi.stubEnv("NODE_ENV", "test");
});

afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
});

describe("POST /api/rsvp — validation", () => {
    it.each<[string, unknown, string]>([
        ["non-object body (null)", null, "Request body must be an object"],
        // Arrays pass the `typeof body === "object" && body !== null` check, so an
        // array body falls through to "party is required" rather than the generic message.
        ["non-object body (array)", [], "party is required"],
        ["non-object body (string)", "hello", "Request body must be an object"],
        ["missing party", { draft: singleGuestBody().draft }, "party is required"],
        [
            "missing party.id",
            { party: { guest1 }, draft: singleGuestBody().draft },
            "party.id is required",
        ],
        [
            "empty party.id",
            { party: { id: "", guest1 }, draft: singleGuestBody().draft },
            "party.id is required",
        ],
        [
            "missing party.guest1",
            { party: { id: "42" }, draft: singleGuestBody().draft },
            "party.guest1 is required",
        ],
        [
            "malformed party.guest2",
            { party: { id: "42", guest1, guest2: { firstName: "x" } }, draft: singleGuestBody().draft },
            "party.guest2 is invalid",
        ],
        [
            "missing draft",
            { party: { id: "42", guest1 } },
            "draft is required",
        ],
        [
            "missing draft.attendance",
            { party: { id: "42", guest1 }, draft: {} },
            "draft.attendance is required",
        ],
        [
            "missing draft.attendance.guest1",
            { party: { id: "42", guest1 }, draft: { attendance: {} } },
            "draft.attendance.guest1 is required",
        ],
        [
            "invalid draft.attendance.guest1",
            { party: { id: "42", guest1 }, draft: { attendance: { guest1: "maybe" } } },
            "draft.attendance.guest1 is required",
        ],
        [
            "missing draft.attendance.guest2 for two-guest party",
            {
                party: { id: "42", guest1, guest2 },
                draft: { attendance: { guest1: "attending" } },
            },
            "draft.attendance.guest2 is required",
        ],
        [
            "missing draft.meal.guest1 when attending",
            singleGuestBody({ meal: {} }),
            "draft.meal.guest1 is required",
        ],
        [
            "invalid draft.meal.guest1.selectedEntree",
            singleGuestBody({ meal: { guest1: { selectedEntree: "lobster" } } }),
            "draft.meal.guest1.selectedEntree is required",
        ],
        [
            "non-string draft.meal.guest1.dietaryNotes",
            singleGuestBody({ meal: { guest1: { selectedEntree: "steak", dietaryNotes: 5 } } }),
            "draft.meal.guest1.dietaryNotes must be a string",
        ],
        [
            "missing draft.transportation.guest1 when attending",
            singleGuestBody({ transportation: {} }),
            "draft.transportation.guest1 is required",
        ],
        [
            "invalid draft.transportation.guest1.ridingBus",
            singleGuestBody({ transportation: { guest1: { ridingBus: "maybe", stayingAt: "homewoodSuites" } } }),
            "draft.transportation.guest1.ridingBus is required",
        ],
        [
            "invalid draft.transportation.guest1.stayingAt",
            singleGuestBody({ transportation: { guest1: { ridingBus: "riding", stayingAt: "someRandomHotel" } } }),
            "draft.transportation.guest1.stayingAt is required",
        ],
        [
            "missing draft.rehearsalMixer.guest1 when attending",
            singleGuestBody({ rehearsalMixer: {} }),
            "draft.rehearsalMixer.guest1 is required",
        ],
    ])("rejects %s", async (_description, body, expectedError) => {
        const res = await POST(makeRequest(body));
        const json = await res.json();

        expect(res.status).toBe(400);
        expect(json).toEqual({ success: false, error: expectedError });
        expect(mockFindRecordByNumberField).not.toHaveBeenCalled();
    });

    it("accepts stayingAt values from the alternate hotel labels (notSure, other)", async () => {
        mockFindRecordByNumberField.mockResolvedValue(partyRecord);
        mockGetRecord.mockImplementation(async (_table, id) =>
            id === "recGuest1" ? guest1Record : guest2Record,
        );
        mockUpdateRecord.mockResolvedValue(guest1Record);

        for (const stayingAt of ["notSure", "other"]) {
            const res = await POST(
                makeRequest(
                    singleGuestBody({
                        transportation: { guest1: { ridingBus: "declining", stayingAt } },
                    }),
                ),
            );
            expect(res.status).toBe(200);
        }
    });

    it("allows a declining guest to skip meal/transportation/rehearsalMixer entirely", async () => {
        mockFindRecordByNumberField.mockResolvedValue(partyRecord);
        mockGetRecord.mockResolvedValue(guest1Record);
        mockUpdateRecord.mockResolvedValue(guest1Record);

        const res = await POST(
            makeRequest({
                party: { id: "42", guest1 },
                draft: { attendance: { guest1: "declining" } },
            }),
        );
        const json = await res.json();

        expect(res.status).toBe(200);
        expect(json.success).toBe(true);
        expect(mockFindRecordByNumberField).toHaveBeenCalled();
    });

    it("treats malformed JSON as a validation failure rather than crashing", async () => {
        const res = await POST(makeRawRequest("{not valid json"));
        const json = await res.json();

        expect(res.status).toBe(400);
        expect(json).toEqual({ success: false, error: "Request body must be an object" });
        expect(mockFindRecordByNumberField).not.toHaveBeenCalled();
    });
});

describe("POST /api/rsvp — dev error escape hatch", () => {
    it("returns a forced 500 for ?error=1 without touching Airtable", async () => {
        const res = await POST(makeRequest(singleGuestBody(), "?error=1"));
        const json = await res.json();

        expect(res.status).toBe(500);
        expect(json).toEqual({ success: false, error: "Forced error for testing" });
        expect(mockFindRecordByNumberField).not.toHaveBeenCalled();
    });

    it("is disabled in production and falls through to normal handling", async () => {
        vi.stubEnv("NODE_ENV", "production");
        mockFindRecordByNumberField.mockResolvedValue(partyRecord);
        mockGetRecord.mockImplementation(async (_table, id) =>
            id === "recGuest1" ? guest1Record : guest2Record,
        );
        mockUpdateRecord.mockResolvedValue(guest1Record);

        const res = await POST(makeRequest(singleGuestBody(), "?error=1"));
        const json = await res.json();

        expect(res.status).toBe(200);
        expect(json.success).toBe(true);
    });
});

describe("POST /api/rsvp — party/guest lookup", () => {
    it("returns 404 when the party isn't found in Airtable", async () => {
        mockFindRecordByNumberField.mockResolvedValue(null);

        const res = await POST(makeRequest(singleGuestBody()));
        const json = await res.json();

        expect(res.status).toBe(404);
        expect(json).toEqual({ success: false, error: "Party not found" });
    });

    it("returns 404 when the party record has no linked guest1", async () => {
        mockFindRecordByNumberField.mockResolvedValue({
            id: "recParty1",
            fields: { id: 42, guests: [] },
        });

        const res = await POST(makeRequest(singleGuestBody()));
        const json = await res.json();

        expect(res.status).toBe(404);
        expect(json).toEqual({ success: false, error: "Party not found" });
    });

    it("skips the Airtable lookup and returns 404 when party.id doesn't coerce to a finite number", async () => {
        const res = await POST(makeRequest(singleGuestBody({ id: "abc" })));
        const json = await res.json();

        expect(res.status).toBe(404);
        expect(json).toEqual({ success: false, error: "Party not found" });
        expect(mockFindRecordByNumberField).not.toHaveBeenCalled();
    });

    it("returns 500 when the party lookup throws", async () => {
        mockFindRecordByNumberField.mockRejectedValue(new Error("airtable down"));

        const res = await POST(makeRequest(singleGuestBody()));
        const json = await res.json();

        expect(res.status).toBe(500);
        expect(json).toEqual({ success: false, error: "Failed to look up party" });
    });

    it("returns 500 when fetching guest1's record throws", async () => {
        mockFindRecordByNumberField.mockResolvedValue(partyRecord);
        mockGetRecord.mockRejectedValue(new Error("airtable down"));

        const res = await POST(makeRequest(singleGuestBody()));
        const json = await res.json();

        expect(res.status).toBe(500);
        expect(json).toEqual({ success: false, error: "Failed to look up party" });
    });
});

describe("POST /api/rsvp — success paths", () => {
    it("updates a single attending guest with the full field set", async () => {
        mockFindRecordByNumberField.mockResolvedValue({
            id: "recParty1",
            fields: { id: 42, guests: ["recGuest1"] },
        });
        mockGetRecord.mockResolvedValue(guest1Record);
        mockUpdateRecord.mockResolvedValue(guest1Record);

        const res = await POST(makeRequest(singleGuestBody()));
        const json = await res.json();

        expect(res.status).toBe(200);
        expect(json).toMatchObject({ success: true, partyId: "42" });
        expect(typeof json.updatedAt).toBe("string");
        expect(new Date(json.updatedAt).toString()).not.toBe("Invalid Date");

        expect(mockUpdateRecord).toHaveBeenCalledTimes(1);
        expect(mockUpdateRecord).toHaveBeenCalledWith(
            "Guests",
            "recGuest1",
            expect.objectContaining({
                attending: "attending",
                mealChoice: "steak",
                dietaryNotes: "none",
                stayingAt: "homewoodSuites",
                ridingBus: "riding",
                rehearsalMixer: "attending",
                updatedOn: json.updatedAt,
            }),
        );
    });

    it("updates both guests of a two-guest attending party", async () => {
        mockFindRecordByNumberField.mockResolvedValue(partyRecord);
        mockGetRecord.mockImplementation(async (_table, id) =>
            id === "recGuest1" ? guest1Record : guest2Record,
        );
        mockUpdateRecord.mockResolvedValue(guest1Record);

        const res = await POST(makeRequest(twoGuestBody()));
        const json = await res.json();

        expect(res.status).toBe(200);
        expect(mockUpdateRecord).toHaveBeenCalledTimes(2);

        const [firstCall, secondCall] = mockUpdateRecord.mock.calls;
        expect(firstCall[1]).toBe("recGuest1");
        expect(secondCall[1]).toBe("recGuest2");
        // Both guests share the same updatedAt timestamp computed once for the request.
        expect(firstCall[2].updatedOn).toBe(json.updatedAt);
        expect(secondCall[2].updatedOn).toBe(json.updatedAt);
    });

    it("writes only the declining shape (no meal/transportation fields) for a declining guest", async () => {
        mockFindRecordByNumberField.mockResolvedValue({
            id: "recParty1",
            fields: { id: 42, guests: ["recGuest1"] },
        });
        mockGetRecord.mockResolvedValue(guest1Record);
        mockUpdateRecord.mockResolvedValue(guest1Record);

        await POST(
            makeRequest({
                party: { id: "42", guest1 },
                draft: { attendance: { guest1: "declining" } },
            }),
        );

        expect(mockUpdateRecord).toHaveBeenCalledTimes(1);
        const fields = mockUpdateRecord.mock.calls[0][2];
        expect(fields.attending).toBe("declining");
        expect(fields).not.toHaveProperty("mealChoice");
        expect(fields).not.toHaveProperty("stayingAt");
        expect(fields).not.toHaveProperty("ridingBus");
        expect(fields).not.toHaveProperty("rehearsalMixer");
        expect(fields).toHaveProperty("updatedOn");
    });

    it("silently drops the guest2 update when the party's Airtable record only links one guest, even though the request answered for guest2", async () => {
        // party.guest2 is present in the request and passes validation, but the
        // Airtable party record's `guests` link array only has one id — so
        // guest2Record never resolves and the guard at route.ts:308 drops the
        // guest2 update without any error surfacing to the caller. Documented
        // here as a possible silent-partial-success product gap, not something
        // fixed as part of adding tests.
        mockFindRecordByNumberField.mockResolvedValue({
            id: "recParty1",
            fields: { id: 42, guests: ["recGuest1"] },
        });
        mockGetRecord.mockResolvedValue(guest1Record);
        mockUpdateRecord.mockResolvedValue(guest1Record);

        const res = await POST(makeRequest(twoGuestBody()));

        expect(res.status).toBe(200);
        expect(mockUpdateRecord).toHaveBeenCalledTimes(1);
        expect(mockUpdateRecord).toHaveBeenCalledWith("Guests", "recGuest1", expect.anything());
    });
});

describe("POST /api/rsvp — update failures", () => {
    it("returns 500 when updating guest1 throws", async () => {
        mockFindRecordByNumberField.mockResolvedValue({
            id: "recParty1",
            fields: { id: 42, guests: ["recGuest1"] },
        });
        mockGetRecord.mockResolvedValue(guest1Record);
        mockUpdateRecord.mockRejectedValue(new Error("airtable write failed"));

        const res = await POST(makeRequest(singleGuestBody()));
        const json = await res.json();

        expect(res.status).toBe(500);
        expect(json).toEqual({ success: false, error: "Failed to update attendance" });
    });

    it("returns 500 when guest1 succeeds but guest2's update throws", async () => {
        mockFindRecordByNumberField.mockResolvedValue(partyRecord);
        mockGetRecord.mockImplementation(async (_table, id) =>
            id === "recGuest1" ? guest1Record : guest2Record,
        );
        mockUpdateRecord.mockImplementation(async (_table, id) => {
            if (id === "recGuest1") return guest1Record;
            throw new Error("airtable write failed");
        });

        const res = await POST(makeRequest(twoGuestBody()));
        const json = await res.json();

        expect(res.status).toBe(500);
        expect(json).toEqual({ success: false, error: "Failed to update attendance" });
    });
});
