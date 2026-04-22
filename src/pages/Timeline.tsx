import React from "react";

export default function Timeline({ loaded = true }: { loaded?: boolean })  {
    let startTime = new Date(2026, 10, 31, 9, 30);
    let endTime = new Date(2026, 10, 31, 20, 30);

    let current = startTime;
    let timeSlots:Array<string> = [];

    while (current <= endTime) {
        timeSlots.push(current.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        current.setMinutes(current.getMinutes() + 15);
    }
    
    let numSlots = timeSlots.length;
    console.log(numSlots)

    return (
        <div className="detailed-timeline">
            <h1 style={{ margin: "120px 60px" }}>Timeline</h1>



            <div style={{ display: "flex", gap: "10px", overflowX: "auto", padding: "10px" }}>
                {timeSlots.map((slot, index) => (
                    <div className="" key={index}>
                        <p>{slot}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
