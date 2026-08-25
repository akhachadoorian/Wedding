import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { RadioButtons, SwitchField } from "../FormInputs";
import {
    ALTERNATE_HOTEL_OPTIONS,
    HOTEL_OPTIONS,
    isStayingAtHotel,
    RSVP_KEY_BY_STEP,
} from "../types";
import type {
    Guest,
    GuestKey,
    Transportation as TransportationAnswer,
} from "../types";
import {
    GuestLabelInputWrapper,
    RSVPNavButtons,
    RSVPStepVertical,
} from "./RSVPStep";
import { useHandleGuestUpdate } from "./useHandleGuestUpdate";
import { useStepAnswers } from "./useStepAnswers";
import { useStepSubmit } from "./useStepSubmit";

const STEP_NUM = 4;

const KEY = RSVP_KEY_BY_STEP[STEP_NUM];

export default function Transportation() {
    const stepAnswers = useStepAnswers(KEY);
    if (!stepAnswers) return null;

    const {
        guest1,
        guest2,
        answers,
        renderGuestOne,
        renderGuestTwo,
        allAnswered,
    } = stepAnswers;
    const { handleSubmit } = useStepSubmit({
        canAdvance: allAnswered,
    });

    // const hotelInputName = `hotel-${guestKey}`;
    // const takingBusInputName = `taking_bus-${guestKey}`;

    const { handleGuestFieldUpdate } = useHandleGuestUpdate();

    const handleBusUpdate = (value: boolean) => {
        if (renderGuestOne) {
            handleGuestFieldUpdate(KEY, "guest1", "takingBus", value);
        }
        if (renderGuestTwo) {
            handleGuestFieldUpdate(KEY, "guest2", "takingBus", value);
        }
    };

    const handleHotelUpdate = (value: TransportationAnswer["stayingAt"]) => {
        if (renderGuestOne) {
            handleGuestFieldUpdate(KEY, "guest1", "stayingAt", value);
            // if (!isStayingAtHotel(value)) {
            //     handleGuestFieldUpdate(KEY, 'guest1', "takingBus", false);
            // }
        }
        if (renderGuestTwo) {
            handleGuestFieldUpdate(KEY, "guest2", "stayingAt", value);
            // if (!isStayingAtHotel(value)) {
            //     handleGuestFieldUpdate(KEY, 'guest2', "takingBus", false);
            // }
        }
    };

    const takingBus = renderGuestOne
        ? answers?.guest1?.takingBus
        : answers?.guest2?.takingBus;

    // const hotelOpts = takingBus ? HOTEL_OPTIONS : ALTERNATE_HOTEL_OPTIONS

    return (
        <RSVPStepVertical currStep={STEP_NUM}>
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-500"
            >
                <div className="flex flex-col gap-500 divide-y divide-gray">
                    <div className="flex flex-col gap-500">
                        <SwitchField
                            label="Will you use the complimentary shuttle to/from the venue?"
                            note="Please note: You must be staying at the three listed hotels"
                            switchProps={{
                                name: "taking_bus",
                                onChange: (value) => handleBusUpdate(value),
                                option_1: { text: "Yes", value: true },
                                option_2: { text: "No", value: false },
                                currValue: renderGuestOne
                                    ? answers?.guest1?.takingBus
                                    : answers?.guest2?.takingBus,
                                // disabled: !canTakeBus
                            }}
                        />

                        <div
                            className={cn(
                                "grid transition-[grid-template-rows] duration-300 ease-in-out",
                                takingBus === undefined
                                    ? "grid-rows-[0fr]"
                                    : "grid-rows-[1fr]",
                            )}
                        >
                            <div className="overflow-hidden">
                                {takingBus === true && (
                                    <FadeIn key="hotel">
                                        <RadioButtons
                                            label="Select Hotel for Pickup/Drop Off"
                                            name={"hotel"}
                                            options={HOTEL_OPTIONS}
                                            onChange={handleHotelUpdate}
                                            currValue={
                                                renderGuestOne
                                                    ? answers?.guest1?.stayingAt
                                                    : answers?.guest2?.stayingAt
                                            }
                                        />
                                    </FadeIn>
                                )}

                                {takingBus === false && (
                                    <FadeIn key="warning">
                                        <div className="flex flex-col gap-200 border-2 p-300 bg-cabernet text-center">
                                            <p className="eyebrow">
                                                Rideshare Warning
                                            </p>
                                            <p className="text-sm leading-normal">
                                                Just a reminder that rideshares,
                                                while available to the venue,
                                                will be very difficult to find —
                                                if you can even find one — for
                                                the trip back. Please plan
                                                accordingly.
                                            </p>
                                        </div>
                                    </FadeIn>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <RSVPNavButtons
                    back={{ disabled: false }}
                    next={{ disabled: !allAnswered }}
                />
            </form>
        </RSVPStepVertical>
    );
}

function FadeIn({ children }: { children: React.ReactNode }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const raf = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <div
            className={cn(
                "transition-opacity duration-300 ease-in-out",
                visible ? "opacity-100" : "opacity-0",
            )}
        >
            {children}
        </div>
    );
}
