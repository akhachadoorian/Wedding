import Eyebrow from "../Eyebrow/Eyebrow"
import { FORM_THANK_YOU } from "./content"


export default function RSVPThankYou({coming}:{coming: boolean}) {

    const {eyebrow, header, body} = coming ? FORM_THANK_YOU.yes : FORM_THANK_YOU.no


    return (
        <div className="">
            <Eyebrow text={eyebrow} />
            <h2>{header}</h2>
            <p>{body}</p>
        </div>
    )
}