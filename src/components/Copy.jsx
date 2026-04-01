import React from "react";
import Eyebrow from "./Eyebrow";

function Copy({text, eyebrow, variation = "left" }) {


    return (
        <div className={`copy-wrapper ${variation}`}>
            {eyebrow ? 
                <Eyebrow 
                    text={eyebrow}
                    variation={variation}
                />
            :
                null
            }
            <div className="copy" dangerouslySetInnerHTML={{ __html: text }} />
        </div>
    )
}

export default Copy;