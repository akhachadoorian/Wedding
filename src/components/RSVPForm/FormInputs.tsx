import { cn } from "@/utils/cn";
import { BTN_TEXT_CLASSES } from "../Buttons/Button";
import { buttonVariants } from "../Buttons/button.variants";
import { NonEmptyArray, TextValueOption } from "@/types/utility";

// #region -- Yes/No Boolean Switch ---

interface SwitchFieldProps<V = string> {
    layout?: "row" | "column";
    label?: string; // todo: label class?
    note?: string;
    switchProps: SwitchProps<V>;
}

export function SwitchField<V = string>({
    layout = "column",
    label,
    note,
    switchProps,
}: SwitchFieldProps<V>) {
    if (layout === "row") {
        return (
            <div className="flex flex-col md:flex-row gap:">
                {(label || note) && (
                    <div className="flex flex-col gap-200">
                        {label && <p className="eyebrow">{label}</p>}
                        {note && <p className="">{note}</p>}
                    </div>
                )}

                <Switch {...switchProps} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-200">
            <div className="flex flex-col gap-400">
                {label && <p className="eyebrow">{label}</p>}

                <Switch {...switchProps} />
            </div>

            {note && <p className="text-sm italic">{note}</p>}
        </div>
    );
}



interface SwitchOption<V> {
    label: string;
    value: V;
}

interface SwitchProps<V = string> {
    name: string;
    onChange: (value: V) => void;
    currValue: V | undefined;
    option_1: SwitchOption<V>;
    option_2: SwitchOption<V>;
    disabled?: boolean;
}

export function Switch<V = string>({
    name,
    onChange,
    currValue,
    disabled = false,
    option_1,
    option_2,
}: SwitchProps<V>) {
    return (
        <div
            className="rsvp_switch_group relative flex border border-cream p-100"
            role="radiogroup"
        >
            {/* FIXME: FIX */}
            {/* <span
                className={cn(
                    "rsvp_switch_group-thumb",
                    currValue === false && "rsvp_switch_group-thumb-no",
                )}
                style={{ opacity: currValue === undefined ? 0 : 1 }}
                aria-hidden="true"
            /> */}

            <SwitchOptionInput
                name={name}
                value={String(option_1.value)}
                onChange={() => onChange(option_1.value)}
                text={option_1.label}
                isActive={currValue === option_1.value}
                disabled={disabled}
            />

            <SwitchOptionInput
                name={name}
                value={String(option_2.value)}
                onChange={() => onChange(option_2.value)}
                text={option_2.label}
                isActive={currValue === option_2.value}
                disabled={disabled}
            />
        </div>
    );
}

interface SwitchOptionInputProps {
    name: string;
    value: string;
    onChange: () => void;
    text: string;
    isActive: boolean;
    disabled?: boolean;
}

function SwitchOptionInput({
    name,
    value,
    onChange,
    text,
    isActive,
    disabled = false,
}: SwitchOptionInputProps) {
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
    const { text, value, subtext, note } = option; // FIXME: do subnotes

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

interface TextInputStyleProps {
    centerContent?: boolean
    maxInputWidth?: string
}

// const DEFAULT

interface TextInputProps {
    name: string;
    label: string;
    placeholder?: string;
    onChange: (value: string) => void;
    value: string;
    hasError: boolean;
    className?: string;
    styleOptions?: TextInputStyleProps;
}

export function TextInput({
    name,
    label,
    placeholder,
    onChange,
    value,
    hasError,
    className,
    styleOptions
}: TextInputProps) {
    return (
        <div className={cn("flex min-w-0 flex-1 flex-col gap-150", styleOptions?.centerContent && 'items-center', className)}>
            <label
                className={cn("font-sans text-s font-semibold leading-normal tracking-[0.6px] text-cream uppercase", styleOptions?.centerContent && 'text-center' )}
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
                style={styleOptions?.maxInputWidth ? { maxWidth: styleOptions.maxInputWidth } : undefined}
                className={cn('box-border w-full border-[1.5px] bg-black px-200 py-200 font-sans leading-normal text-cream placeholder:font-sans placeholder:text-base placeholder:tex-cream placeholder:transition placeholder:duration-300 focus:outline-none focus:placeholder:opacity-0 autofill:shadow-[0_0_0px_1000px_var(--gray)_inset] autofill:[-webkit-text-fill-color:var(--cream)]', hasError ? "border-burgundy" : "border-(--black-850) focus:border-cream")}
            />
        </div>
    );
}

// #endregion ---
