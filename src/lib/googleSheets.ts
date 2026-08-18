import { google, sheets_v4 } from "googleapis";

let cachedClient: sheets_v4.Sheets | null = null;

export function getSheetsClient(): sheets_v4.Sheets {
    if (cachedClient) return cachedClient;

    const rawKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    // Handle both literal \n (from .env without quotes) and already-escaped newlines
    const privateKey = rawKey?.includes("\\n") ? rawKey.replace(/\\n/g, "\n") : rawKey;

    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    cachedClient = google.sheets({ version: "v4", auth });
    return cachedClient;
}

export function getSpreadsheetId(): string {
    const id = process.env.GOOGLE_SHEET_ID;
    if (!id) throw new Error("GOOGLE_SHEET_ID is not set");
    return id;
}
