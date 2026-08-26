import Button from "@/components/Buttons/Button"
import Eyebrow from "../Eyebrow/Eyebrow"
import { useRSVPForm } from "./RSVPFormContext"
import { FORM_THANK_YOU } from "./content"


export default function RSVPThankYou({coming}:{coming: boolean}) {

    const {eyebrow, header, body} = coming ? FORM_THANK_YOU.yes : FORM_THANK_YOU.no
    const { goToStep, setDraft, setParty, refetchGuests } = useRSVPForm()

    const handleReturnToStart = () => {
        setParty(null)
        setDraft({ attendance: {} })
        goToStep(1)
        refetchGuests()
    }

    return (
        <div className="flex flex-col items-center md:space-600 md:py-800 md:px-750 py-500 px-0 md:max-w-[60.625vw] md:mx-auto">
            <Eyebrow text={eyebrow} styleOptions={{variation: 'center',includeMargin: true}} />
            <h2 className="text-6xl! leading-[130%] text-center">{header}</h2>
            <p className="mt-300! text-center body-l">{body}</p>

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