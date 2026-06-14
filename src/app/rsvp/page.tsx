"use client";

import React from "react";
import "./RSVP.scss";
import content from "./content";
import TextOnlyHero from "../../layout/TextOnlyHero/TextOnlyHero";
import RSVPForm from "../../components/RSVPForm/RSVPForm";
import ComingSoon from "@/layout/ComingSoon/ComingSoon";

export default function RSVP({ loaded = true }: { loaded?: boolean }) {
    return (
        <>
            <ComingSoon
                pageTitle="RSVP"
                // header="The RSVP page will be coming soon!"
                body="This page will be used to RVSP for the wedding and rehearsal mixer."
            />
        </>
    );
}

// export default function RSVP({ loaded = true }: { loaded?: boolean })  {

//     return (
//         <>
//             <TextOnlyHero
//                 loaded={loaded}
//                 {...content.hero}
//                 styleOptions={{
//                     variation: 'columns',
//                     theme: 'black',
//                     // inset: true
//                 }}
//             />

//             <RSVPForm {...content.form} />
//         </>
//     )
// }
