import { google } from "googleapis";
import { NextResponse } from "next/server";


const GUEST_RANGE = "Guests!A:E"

async function getGuests() {
    const rawKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    // Handle both literal \n (from .env without quotes) and already-escaped newlines
    const privateKey = rawKey?.includes("\\n") ? rawKey.replace(/\\n/g, "\n") : rawKey;

    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const glSheets = google.sheets({ version: "v4", auth });

    const response = await glSheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: GUEST_RANGE,
    });

    return response.data.values;
}

export async function GET() {
    try {
        const data = await getGuests();
        return NextResponse.json(data ?? []);
    } catch (err) {
        console.error("GET /api/guests error:", err);
        return NextResponse.json({ error: "Failed to fetch guests" }, { status: 500 });
    }
}
