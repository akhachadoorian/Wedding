import React from "react";

import Hero from "../components/Hero";
import Copy from "../components/Copy";

function Wedding() {
    return (
        <div className="">
            <Hero />

            <section>
                <Copy 
                    text={"<h2>Once upon a time, we found each other, and now we're counting down the days until we say <span class='gold'>I do</span>. We would be thrilled to have you join us in this next chapter.</h2>"}
                />
            </section>
        </div>
    );
}

export default Wedding;
