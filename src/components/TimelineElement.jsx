import React from "react";

function TimelineElement({time, title, body}) {
    return (
        <div className="timeline_element-wrapper">
            <div className="timeline_element-left"></div>
            <div className="timeline_element-right"></div>
        </div>
    )
}

export default TimelineElement;