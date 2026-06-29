import { google } from "googleapis";
import { NextResponse } from "next/server";

// // Initialize the Google Auth client
// const auth = new google.auth.JWT(
//     process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
//     undefined,
//     process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Fixes newline parsing issues
//     ["https://www.googleapis.com/auth/spreadsheets"],
// );

// const sheets = google.sheets({ version: "v4", auth });
// const spreadsheetId = process.env.GOOGLE_SHEET_ID;

async function getGuests() {
    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const glSheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const response = await glSheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: "RANGE",
    });

    return response.data.values;
}

export async function GET() {
    const data = await getGuests();
    return NextResponse.json(data);
}
