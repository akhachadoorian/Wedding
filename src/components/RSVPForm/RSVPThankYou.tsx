import Button from "@/components/Buttons/Button"
import Eyebrow from "../Eyebrow/Eyebrow"
import { useRSVPForm } from "./RSVPFormContext"
import { FORM_THANK_YOU } from "./content"


export default function RSVPThankYou({coming}:{coming: boolean}) {

    const {eyebrow, header, body} = coming ? FORM_THANK_YOU.yes : FORM_THANK_YOU.no
    const { goToStep, setDraft, setParty } = useRSVPForm()

    const handleReturnToStart = () => {
        setParty(null)
        setDraft({ attendance: {} })
        goToStep(1)
    }

    return (
        <div className="flex flex-col md:items-center md:space-600 py-800 px-750 md:max-w-[60.625vw] md:mx-auto">
            <Eyebrow text={eyebrow} styleOptions={{variation: 'left',includeMargin: true}} />
            <h2>{header}</h2>
            <p className="mt-300!">{body}</p>

            <Button
                variant="outline"
                colorScheme="cream"
                btnSettings={{
                    type: "native",
                    text: "Return to Start",
                    onClick: handleReturnToStart,
                }}
                className="mt-500"
            />
        </div>
    )
}