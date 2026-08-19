import { cn } from "@/utils/cn";
import { BTN_TEXT_CLASSES } from "../Buttons/Button";
import { buttonVariants } from "../Buttons/button.variants";
import { NonEmptyArray, TextValueOption } from "@/types/utility";

// #region -- Yes/No Boolean Switch ---
interface YesNoBooleanSwitchProps {
    name: string;
    onChange: (value: boolean) => void;
    currValue: boolean | undefined;
}

export function YesNoBooleanSwitch({
    name,
    onChange,
    currValue,
}: YesNoBooleanSwitchProps) {
    return (
        <div
            className="rsvp_switch_group relative flex border border-cream p-100"
            role="radiogroup"
        >
            <span
                className={cn(
                    "rsvp_switch_group-thumb",
                    currValue === false && "rsvp_switch_group-thumb-no",
                )}
                style={{ opacity: currValue === undefined ? 0 : 1 }}
                aria-hidden="true"
            />

            <YesNoBooleanSwitchOption
                name={name}
                value="yes"
                onChange={() => onChange(true)}
                text="Yes"
                isActive={currValue === true}
            />

            <YesNoBooleanSwitchOption
                name={name}
                value="no"
                onChange={() => onChange(false)}
                text="No"
                isActive={currValue === false}
            />
        </div>
    );
}

interface YesNoBooleanSwitchOptionProps {
    name: string;
    value: string;
    onChange: () => void;
    text: string;
    isActive: boolean;
}

function YesNoBooleanSwitchOption({
    name,
    value,
    onChange,
    text,
    isActive,
}: YesNoBooleanSwitchOptionProps) {
    const id = `${name}-${value}`;

    return (
        <label
            htmlFor={id}
            className={cn(
                "rsvp_switch",
                "relative flex-1 justify-center cursor-pointer",
                buttonVariants({ size: "small" }),
            )}
        >
            <input
                id={id}
                className="rsvp_switch-input sr-only"
                type="radio"
                name={name}
                value={value}
                checked={isActive}
                onChange={onChange}
            />

            <p
                className={cn(
                    BTN_TEXT_CLASSES,
                    "rsvp_switch-text",
                    isActive ? "text-cabernet" : "text-cream",
                )}
            >
                {text}
            </p>
        </label>
    );
}

// #endregion ---

// #region --- Radio Buttons ---

// TODO: name better
export interface ExpandedTextValueOptions extends TextValueOption {
    subtext?: string;
    note?: string;
}

interface RadioButtonsProps {
    name: string;
    label?: string;
    options: NonEmptyArray<ExpandedTextValueOptions>;
    onChange: (value: string) => void;
    currValue?: string;
}

export function RadioButtons({
    name,
    label,
    options,
    onChange,
    currValue,
}: RadioButtonsProps) {
    return (
        <div className="flex flex-col gap-300" role="radiogroup">
            {label && <p className="eyebrow">{label}</p>}

            {options.map((opt) => {
                return (
                    <RadioButton
                        key={opt.value}
                        name={name}
                        option={opt}
                        onChange={onChange}
                        isSelected={currValue === opt.value}
                    />
                );
            })}
        </div>
    );
}

interface RadioButtonProps {
    name: string;
    option: ExpandedTextValueOptions;
    onChange: (value: string) => void;
    isSelected: boolean;
}

function RadioButton({ name, option, onChange, isSelected }: RadioButtonProps) {
    const { text, value, subtext, note } = option;

    const id = `${name}-${value}`;
    return (
        <label htmlFor={id} className="flex gap-100">
            <input
                id={id}
                name={name}
                type="radio"
                value={value}
                onChange={() => onChange(value)}
                checked={isSelected}
            />

            <div className="">
                <p>{text}</p>
            </div>
        </label>
    );
}

// #endregion ---

// #region --- Text Area ---

interface TextAreaProps {
    name: string;
    label: string;
    placeholder?: string;
    rows?: number;
    cols?: number;
}

export function TextArea({
    name,
    label,
    placeholder,
    rows = 5,
    cols = 40,
}: TextAreaProps) {
    return (
        <div className="flex flex-col gap-300">
            <label htmlFor={name} className="eyebrow">
                {label}
            </label>

            <textarea
                id={name}
                name={name}
                placeholder={placeholder ? placeholder : ""}
                rows={rows}
                cols={cols}
            />
        </div>
    );
}

// #endregion ---

// #region ---

// #endregion ---
