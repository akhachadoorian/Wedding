import { NextRequest, NextResponse } from "next/server";
import { getSheetsClient, getSpreadsheetId } from "@/lib/googleSheets";


const GUEST_RANGE = "Guests!A:E"

async function getGuests() {
    const sheets = getSheetsClient();

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: getSpreadsheetId(),
        range: GUEST_RANGE,
    });

    return response.data.values;
}

// Testing error
export async function GET(request: NextRequest) {
    // Dev-only escape hatch to exercise the error flow: /api/guests?error=1
    if (process.env.NODE_ENV !== "production" && request.nextUrl.searchParams.has("error")) {
        return NextResponse.json({ error: "Forced error for testing" }, { status: 500 });
    }

    try {
        const data = await getGuests();
        return NextResponse.json(data ?? []);
    } catch (err) {
        console.error("GET /api/guests error:", err);
        return NextResponse.json({ error: "Failed to fetch guests" }, { status: 500 });
    }
}
