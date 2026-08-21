import { cn } from "@/utils/cn";
import { BTN_TEXT_CLASSES } from "../Buttons/Button";
import { buttonVariants } from "../Buttons/button.variants";
import { NonEmptyArray, TextValueOption } from "@/types/utility";

// #region -- Yes/No Boolean Switch ---

interface YesNoBooleanSwitchFieldProps {
    layout?: "row" | "column";
    label?: string; // todo: label class?
    note?: string;
    switchProps: YesNoBooleanSwitchProps;
}

export function YesNoBooleanSwitchField({
    layout = "column",
    label,
    note,
    switchProps,
}: YesNoBooleanSwitchFieldProps) {
    if (layout === "row") {
        return (
            <div className="flex flex-col md:flex-row gap:">
                {(label || note) && (
                    <div className="flex flex-col gap-200">
                        {label && <p className="eyebrow">{label}</p>}
                        {note && <p className="">{note}</p>}
                    </div>
                )}

                <YesNoBooleanSwitch {...switchProps} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-200">
            <div className="flex flex-col gap-400">
                {label && <p className="eyebrow">{label}</p>}

                <YesNoBooleanSwitch {...switchProps} />
            </div>

            {note && <p className="text-sm italic">{note}</p>}
        </div>
    );
}

interface YesNoBooleanSwitchProps {
    name: string;
    onChange: (value: boolean) => void;
    currValue: boolean | undefined;
    disabled?: boolean;
}

export function YesNoBooleanSwitch({
    name,
    onChange,
    currValue,
    disabled = false,
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
                disabled={disabled}
            />

            <YesNoBooleanSwitchOption
                name={name}
                value="no"
                onChange={() => onChange(false)}
                text="No"
                isActive={currValue === false}
                disabled={disabled}
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
    disabled?: boolean;
}

function YesNoBooleanSwitchOption({
    name,
    value,
    onChange,
    text,
    isActive,
    disabled = false,
}: YesNoBooleanSwitchOptionProps) {
    const id = `${name}-${value}`;

    return (
        <label
            htmlFor={id}
            className={cn(
                "rsvp_switch",
                "relative flex-1 justify-center cursor-pointer",
                buttonVariants({ size: "small" }),
                disabled && "cursor-not-allowed opacity-50",
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
                disabled={disabled}
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
export interface ExpandedTextValueOptions<
    V = string,
> extends TextValueOption<V> {
    subtext?: string;
    note?: string;
}

interface RadioButtonsProps<V = string> {
    name: string;
    label?: string;
    options: NonEmptyArray<ExpandedTextValueOptions<V>>;
    onChange: (value: V) => void;
    currValue?: V;
}

export function RadioButtons<V = string>({
    name,
    label,
    options,
    onChange,
    currValue,
}: RadioButtonsProps<V>) {
    return (
        <div className="flex flex-col gap-300" role="radiogroup">
            {label && <p className="eyebrow">{label}</p>}

            {options.map((opt) => {
                return (
                    <RadioButton
                        key={String(opt.value)}
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

interface RadioButtonProps<V = string> {
    name: string;
    option: ExpandedTextValueOptions<V>;
    onChange: (value: V) => void;
    isSelected: boolean;
}

function RadioButton<V = string>({
    name,
    option,
    onChange,
    isSelected,
}: RadioButtonProps<V>) {
    const { text, value, subtext, note } = option;

    const id = `${name}-${value}`;
    return (
        <label htmlFor={id} className="flex gap-100">
            <input
                id={id}
                name={name}
                type="radio"
                value={String(value)}
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

// #region --- Text Field ---

interface TextInputProps {
    name: string;
    label: string;
    placeholder?: string;
    onChange: (value: string) => void;
    value: string;
    hasError: boolean;
}

export function TextInput({
    name,
    label,
    placeholder,
    onChange,
    value,
    hasError,
}: TextInputProps) {
    return (
        <div className="flex min-w-0 flex-1 flex-col gap-150">
            <label
                className="font-sans text-s font-semibold leading-normal tracking-[0.6px] text-cream uppercase"
                htmlFor={name}
            >
                {label}
            </label>
            <input
                id={name}
                name={name}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`box-border w-full border-[1.5px] bg-black px-200 py-200 font-sans leading-normal text-cream placeholder:font-sans placeholder:text-base placeholder:tex-cream placeholder:transition placeholder:duration-300 focus:outline-none focus:placeholder:opacity-0 ${hasError ? "border-burgundy" : "border-(--black-850) focus:border-cream"}`}
            />
        </div>
    );
}

// #endregion ---
