import { cn } from "@/utils/cn";
import { BTN_TEXT_CLASSES } from "../Buttons/Button";
import { buttonVariants } from "../Buttons/button.variants";
import { NonEmptyArray, TextValueOption } from "@/types/utility";
import Eyebrow from "../Eyebrow/Eyebrow";
import React from "react";

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
                    <div className="flex flex-col gap-200 text-center">
                        {label && <p className="eyebrow">{label}</p>}
                        {note && <p className="">{note}</p>}
                    </div>
                )}

                <Switch {...switchProps} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-150">
            <div className="flex flex-col gap-400">
                {label && <p className="eyebrow text-center">{label}</p>}

                <Switch {...switchProps} className="" />
            </div>

            {note && <p className="text-sm italic text-center">{note}</p>}
        </div>
    );
}

interface SwitchProps<V = string> {
    name: string;
    onChange: (value: V) => void;
    currValue: V | undefined;
    option_1: TextValueOption<V>;
    option_2: TextValueOption<V>;
    disabled?: boolean;
    className?: string;
}

export function Switch<V = string>({
    name,
    onChange,
    currValue,
    disabled = false,
    option_1,
    option_2,
    className,
}: SwitchProps<V>) {
    return (
        <div
            className={cn(
                "rsvp_switch_group relative flex border border-cream p-100",
                className,
            )}
            role="radiogroup"
        >
            <span
                className={cn(
                    "rsvp_switch_group-thumb",
                    currValue === option_2.value &&
                        "rsvp_switch_group-thumb-active",
                )}
                style={{ opacity: currValue === undefined ? 0 : 1 }}
                aria-hidden="true"
            />

            <SwitchOptionInput
                name={name}
                value={String(option_1.value)}
                onChange={() => onChange(option_1.value)}
                text={option_1.text}
                isActive={currValue === option_1.value}
                disabled={disabled}
            />

            <SwitchOptionInput
                name={name}
                value={String(option_2.value)}
                onChange={() => onChange(option_2.value)}
                text={option_2.text}
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
                !isActive && !disabled && "rsvp_switch-hoverable",
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
    note?: string;
    options: NonEmptyArray<ExpandedTextValueOptions<V>>;
    onChange: (value: V) => void;
    currValue?: V;
    disabled?: boolean;
    className?: string;
}

export function RadioButtons<V = string>({
    name,
    label,
    note,
    options,
    onChange,
    currValue,
    disabled,
    className,
}: RadioButtonsProps<V>) {
    return (
        <div className={cn("flex flex-col gap-150", className)}>
            <div className={cn("flex flex-col gap-300")} role="radiogroup">
                {label && (
                    <p
                        className={cn(
                            "eyebrow text-center",
                            disabled && "opacity-50",
                        )}
                    >
                        {label}
                    </p>
                )}

                <div className="flex flex-wrap gap-x-(--layout-column-gutter) gap-y-300">
                    {options.map((opt) => {
                        return (
                            <RadioButton
                                key={String(opt.value)}
                                name={name}
                                option={opt}
                                onChange={onChange}
                                isSelected={currValue === opt.value}
                                className="flex-[1_0_300px]"
                                disabled={disabled}
                            />
                        );
                    })}
                </div>
            </div>
            {note && <p className="text-sm italic text-center">{note}</p>}
        </div>
    );
}

interface RadioButtonProps<V = string> {
    name: string;
    option: ExpandedTextValueOptions<V>;
    onChange: (value: V) => void;
    isSelected: boolean;
    disabled?: boolean;
    className?: string;
}

function RadioButton<V = string>({
    name,
    option,
    onChange,
    isSelected,
    disabled,
    className,
}: RadioButtonProps<V>) {
    const { text, value, subtext, note } = option; // FIXME: do subnotes
    console.log("subtext", subtext);

    const id = `${name}-${value}`;
    return (
        <label
            htmlFor={id}
            className={cn(
                "group relative flex items-start gap-200 border-2 p-300 transition-colors duration-300 ease-in-out cursor-pointer md:py-400 md:px-300",
                isSelected
                    ? "border-cream bg-cabernet"
                    : disabled
                      ? "border-(--black-850)"
                      : "border-(--black-850) hover:border-cream/60",
                disabled && "cursor-not-allowed opacity-50",
                className,
            )}
        >
            <input
                id={id}
                name={name}
                type="radio"
                value={String(value)}
                onChange={() => onChange(value)}
                checked={isSelected}
                className="sr-only"
                disabled={disabled}
            />

            <div className="flex flex-col justify-center gap-100 text-center h-full w-full">
                <p className="text-md lg:text-lg">{text}</p>
                {subtext && (
                    <p className="uppercase text-xs text-cream/60 font-medium">
                        {subtext.split("\n").map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                {i < subtext.split("\n").length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </p>
                )}
                {note && (
                    <p className="text-xs uppercase text-cream/60">{note}</p>
                )}
            </div>
        </label>
    );
}

// #endregion ---

// #region --- Checkbox ---

interface CheckboxFieldProps {
    label?: string;
    note?: string;
    checkboxProps: CheckboxProps;
    className?: string;
}

export function CheckboxField({
    label,
    note,
    checkboxProps,
    className,
}: CheckboxFieldProps) {
    return (
        <div className={cn("flex flex-col gap-150", className)}>
            {label && <p className="eyebrow text-center">{label}</p>}

            <Checkbox {...checkboxProps} />

            {note && <p className="text-sm italic text-center">{note}</p>}
        </div>
    );
}

interface CheckboxProps {
    name: string;
    text: string;
    checked: boolean | undefined;
    onChange: (value: boolean) => void;
    disabled?: boolean;
}

export function Checkbox({
    name,
    text,
    checked = false,
    onChange,
    disabled = false,
}: CheckboxProps) {
    const id = `${name}-checkbox`;

    return (
        <label
            htmlFor={id}
            className={cn(
                "group flex items-start gap-200 border-2 p-300 cursor-pointer transition-colors duration-300 ease-in-out",
                checked
                    ? "border-cream bg-cabernet"
                    : "border-(--black-850) hover:border-cream/60",
                disabled && "cursor-not-allowed opacity-50",
            )}
        >
            <input
                id={id}
                name={name}
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                className="sr-only"
            />

            <span
                aria-hidden="true"
                className={cn(
                    "mt-025 flex size-200 shrink-0 items-center justify-center border-2 transition-colors duration-300",
                    checked
                        ? "border-cream bg-cream"
                        : "border-cream/40 group-hover:border-cream/70",
                )}
            >
                {checked && (
                    <svg
                        viewBox="0 0 16 16"
                        className="size-150 fill-none stroke-cabernet stroke-[2.5]"
                    >
                        <path
                            d="M3 8.5L6.5 12L13 4.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </span>

            <p className="text-sm leading-normal text-left">{text}</p>
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
            <label htmlFor={name} className="eyebrow text-center">
                {label}
            </label>

            <textarea
                id={name}
                name={name}
                placeholder={placeholder ? placeholder : ""}
                rows={rows}
                cols={cols}
                className="bg-black p-200 font-sans text-base resize-y max-w-[650px] w-full mx-auto"
            />
        </div>
    );
}

// #endregion ---

// #region --- Text Field ---

interface TextInputStyleProps {
    centerContent?: boolean;
    maxInputWidth?: string;
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
    styleOptions,
}: TextInputProps) {
    return (
        <div
            className={cn(
                "flex min-w-0 flex-1 flex-col gap-150",
                styleOptions?.centerContent && "items-center",
                className,
            )}
        >
            <label
                className={cn(
                    "font-sans text-s font-semibold leading-normal tracking-[0.6px] text-cream uppercase text-center",
                    styleOptions?.centerContent && "text-center",
                )}
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
                style={
                    styleOptions?.maxInputWidth
                        ? { maxWidth: styleOptions.maxInputWidth }
                        : undefined
                }
                className={cn(
                    "box-border w-full border-[1.5px] bg-black px-200 py-200 font-sans leading-normal text-cream placeholder:font-sans placeholder:text-base placeholder:text-cream/60  placeholder:italic placeholder:transition placeholder:duration-300 focus:outline-none focus:placeholder:opacity-0 autofill:shadow-[0_0_0px_1000px_var(--gray)_inset] autofill:[-webkit-text-fill-color:var(--cream)]",
                    hasError
                        ? "border-burgundy"
                        : "border-(--black-850) focus:border-cream",
                )}
            />
        </div>
    );
}

// #endregion ---
