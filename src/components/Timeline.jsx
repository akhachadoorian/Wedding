import React from "react";
import TimelineElement from "./TimelineElement";

function Timeline({elements}) {

    
    return (
        <div className="timeline-wrapper">
            {elements.map((t, idx) => (
                <TimelineElement 
                    key={idx}
                    
                />
            ))};
        </div>
    )
}

export default Timeline;