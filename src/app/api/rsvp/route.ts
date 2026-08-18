import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // TODO: write submission back to the Guests sheet
        console.log("RSVP submission:", JSON.stringify(body, null, 2));

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("POST /api/rsvp error:", err);
        return NextResponse.json({ error: "Failed to submit RSVP" }, { status: 500 });
    }
}
