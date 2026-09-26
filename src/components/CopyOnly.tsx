"use client";

import mergeRefs from "../hooks/mergeRefs";
import { useFadeInChildren } from "../hooks/useFadeIn";
import {
    BtnAnySchemeMap,
    BtnVariantMap,
    ThreeButtonsArray,
} from "../types/buttons";
import { ColorVariables } from "../types/colors";
import { WithHTMLProps } from "../types/props";
import { ThreeButtons } from "./Buttons/ButtonGroups";
import Eyebrow from "./Eyebrow";

import { HeadingClassProps, HeadingLevelProps } from "@/types/headings";
import { THREE_BUTTON_DEFAULTS } from "./Buttons/defaults";
import { cn } from "@/utils/cn";
import { BodyClassProps } from "@/types/body";

/**
 * Controls the visual layout and color treatment of the CopyOnly component.
 *
 * @property variation   - Layout mode: `left` (single column, left-aligned),
 *                         `center` (single column, centered), or `columns`
 *                         (two-column split with heading left and body right).
 * @property headingLevel - Semantic heading level rendered for `header`. Defaults to `h2`.
 * @property eyebrowColor - CSS variable token for the eyebrow label color.
 */
type CopyOnlyStyleProps = {
    variation: "left" | "center" | "columns";

    eyebrowColor?: ColorVariables;

    headingLevel?: Exclude<HeadingLevelProps, "h1">;
    headingClass?: HeadingClassProps;

    bodyClass?: BodyClassProps;

    starColor?: ColorVariables;

    subtitleExtra?: boolean;
    subtitleExtraBorderColor?: ColorVariables;

    customBtnVariantMap?: BtnVariantMap<3>;
    customBtnColorSchemeMap?: BtnAnySchemeMap<3>;
};

// Resolved per variation: the columns layout drops the single-column max-width and uses the
// column gutter, while center narrows to 60.417vw from the tablet breakpoint.
const INNER_CLASSES: Record<CopyOnlyStyleProps["variation"], string> = {
    left: "flex flex-col gap-500 md:max-w-[75.833vw] min-[109.375rem]:max-w-[60.417vw]",
    center: "flex flex-col gap-500 items-center text-center md:max-w-[60.417vw] md:m-auto",
    columns: "flex flex-col gap-col-gutter md:flex-row md:items-center",
};

const DEFAULT_STYLE = {
    variation: "left",
    headingLevel: "h2",
    headingClass: "heading-xl",
    eyebrowColor: "--cream",
    starColor: "--wine-600",
    subtitleExtra: false,
    subtitleExtraBorderColor: "--wine-800",
    bodyClass: "body-l",
} satisfies CopyOnlyStyleProps;

/**
 * Props for the CopyOnly component.
 *
 * @property styleOptions - Layout and color configuration. See {@link CopyOnlyStyleProps}.
 * @property eyebrow      - Optional small label rendered above the heading.
 * @property header       - Primary heading text (required).
 * @property subtitle     - Optional secondary heading rendered as `h5`.
 * @property body         - Optional body copy. Accepts raw HTML strings — rendered via
 *                          `dangerouslySetInnerHTML` when HTML tags are detected.
 * @property buttons      - Up to three CTA buttons rendered below the body copy.
 */
export type CopyOnlyProps = WithHTMLProps & {
    // Style Options
    styleOptions?: CopyOnlyStyleProps;

    // Fields
    eyebrow?: string;
    header: string;
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;
};

/**
 * CopyOnly renders a text-only content block with an optional eyebrow, heading,
 * subtitle, body, and CTA buttons. It supports three layout variations — `left`,
 * `center`, and `columns` — and stagger-animates its children on mount.
 *
 * The `columns` variation splits the heading into a left column and the body/buttons
 * into a right column (stacked on mobile, side-by-side on large viewports).
 */
export default function CopyOnly({
    eyebrow,
    header,
    subtitle,
    body,
    buttons,

    styleOptions = DEFAULT_STYLE,

    // WithHTMLProps
    className,
    ref,
    ...htmlProps
}: CopyOnlyProps) {
    // Eyebrow centering only applies to the `center` layout variation.
    // const eyebrowVariation =
    //     styleOptions.variation === "center" ? "center" : "left";

    const animRef = useFadeInChildren<HTMLDivElement>(".mwc-animate", {
        stagger: 0.15,
        y: 24,
    });

    // const Heading = styleOptions.headingLevel ?? "h2";

    return (
        <div
            {...htmlProps}
            ref={mergeRefs(animRef, ref)}
            className={className}
        >
            {styleOptions.variation === "columns" ? (
                <ColumnsCopyOnly
                    eyebrow={eyebrow}
                    header={header}
                    subtitle={subtitle}
                    body={body}
                    buttons={buttons}
                    styleOptions={styleOptions}
                />
            ) : styleOptions.variation === "center" ? (
                <CenterCopyOnly
                    eyebrow={eyebrow}
                    header={header}
                    subtitle={subtitle}
                    body={body}
                    buttons={buttons}
                    styleOptions={styleOptions}
                />
            ) : (
                <LeftCopyOnly
                    eyebrow={eyebrow}
                    header={header}
                    subtitle={subtitle}
                    body={body}
                    buttons={buttons}
                    styleOptions={styleOptions}
                />
            )}
        </div>
    );
}

// #region --- Function Inner Variations ---------------------------------------------

type SubFunctionCopyOnlyProps = {
    eyebrow?: string;
    header: string;
    subtitle?: string;
    body?: string;
    buttons?: ThreeButtonsArray;

    styleOptions: CopyOnlyStyleProps;
};

function ColumnsCopyOnly({
    eyebrow,
    header,
    subtitle,
    body,
    buttons,

    styleOptions,
}: SubFunctionCopyOnlyProps) {
    return (
        <div className={INNER_CLASSES.columns}>
            <div className="flex flex-col gap-200 md:flex-[1_1_762px]">
                <EyebrowHeaderCopyOnly
                    eyebrow={eyebrow}
                    eyebrowColor={styleOptions.eyebrowColor}
                    starColor={styleOptions.starColor}
                    header={header}
                    headingLevel={styleOptions.headingLevel}
                    headingClass={styleOptions.headingClass}
                />
            </div>

            <div className="flex flex-col gap-300 md:flex-[1_1_528px]">
                {subtitle && (
                    <SubtitleCopyOnly
                        subtitle={subtitle}
                        subtitleExtra={
                            styleOptions.subtitleExtra ??
                            DEFAULT_STYLE.subtitleExtra
                        }
                        borderColor={
                            styleOptions.subtitleExtraBorderColor ??
                            DEFAULT_STYLE.subtitleExtraBorderColor
                        }
                    />
                )}

                {body && (
                    <BodyCopyOnly
                        body={body}
                        bodySize={
                            styleOptions.bodyClass ?? DEFAULT_STYLE.bodyClass
                        }
                    />
                )}

                {buttons && (
                    <BtnsCopyOnly
                        buttons={buttons}
                        customBtnColorSchemeMap={
                            styleOptions.customBtnColorSchemeMap
                        }
                        customBtnVariantMap={styleOptions.customBtnVariantMap}
                    />
                )}
            </div>
        </div>
    );
}

function CenterCopyOnly({
    eyebrow,
    header,
    subtitle,
    body,
    buttons,

    styleOptions,
}: SubFunctionCopyOnlyProps) {
    return (
        <div className={INNER_CLASSES.center}>
            <div className="flex flex-col gap-300 items-center">
                <div className="flex flex-col gap-200 items-center">
                    <EyebrowHeaderCopyOnly
                        eyebrow={eyebrow}
                        eyebrowVariation="center"
                        eyebrowColor={styleOptions.eyebrowColor}
                        starColor={styleOptions.starColor}
                        header={header}
                        headingLevel={styleOptions.headingLevel}
                        headingClass={styleOptions.headingClass}
                    />
                </div>

                {subtitle && (
                    <SubtitleCopyOnly
                        subtitle={subtitle}
                        subtitleExtra={
                            styleOptions.subtitleExtra ??
                            DEFAULT_STYLE.subtitleExtra
                        }
                        borderColor={
                            styleOptions.subtitleExtraBorderColor ??
                            DEFAULT_STYLE.subtitleExtraBorderColor
                        }
                    />
                )}

                {body && (
                    <BodyCopyOnly
                        body={body}
                        bodySize={
                            styleOptions.bodyClass ?? DEFAULT_STYLE.bodyClass
                        }
                    />
                )}
            </div>

            {buttons && (
                <BtnsCopyOnly
                    buttons={buttons}
                    customBtnColorSchemeMap={
                        styleOptions.customBtnColorSchemeMap
                    }
                    customBtnVariantMap={styleOptions.customBtnVariantMap}
                    centered
                />
            )}
        </div>
    );
}

function LeftCopyOnly({
    eyebrow,
    header,
    subtitle,
    body,
    buttons,

    styleOptions,
}: SubFunctionCopyOnlyProps) {
    return (
        <div className={INNER_CLASSES.left}>
            <div className="flex flex-col gap-300">
                <div className="flex flex-col gap-200">
                    <EyebrowHeaderCopyOnly
                        eyebrow={eyebrow}
                        eyebrowColor={styleOptions.eyebrowColor}
                        starColor={styleOptions.starColor}
                        header={header}
                        headingLevel={styleOptions.headingLevel}
                        headingClass={styleOptions.headingClass}
                    />
                </div>

                {subtitle && (
                    <SubtitleCopyOnly
                        subtitle={subtitle}
                        subtitleExtra={
                            styleOptions.subtitleExtra ??
                            DEFAULT_STYLE.subtitleExtra
                        }
                        borderColor={
                            styleOptions.subtitleExtraBorderColor ??
                            DEFAULT_STYLE.subtitleExtraBorderColor
                        }
                    />
                )}

                {body && (
                    <BodyCopyOnly
                        body={body}
                        bodySize={
                            styleOptions.bodyClass ?? DEFAULT_STYLE.bodyClass
                        }
                    />
                )}
            </div>

            {buttons && (
                <BtnsCopyOnly
                    buttons={buttons}
                    customBtnColorSchemeMap={
                        styleOptions.customBtnColorSchemeMap
                    }
                    customBtnVariantMap={styleOptions.customBtnVariantMap}
                />
            )}
        </div>
    );
}

// #endregion ----------------------------------------------------------------------

// #region --- Text Elements -------------------------------------------------------

function EyebrowHeaderCopyOnly({
    eyebrow,
    eyebrowVariation = "left",
    eyebrowColor = DEFAULT_STYLE.eyebrowColor,
    starColor = DEFAULT_STYLE.starColor,

    header,
    headingLevel = "h2",
    headingClass = "heading-xl",
}: {
    eyebrow?: string;
    eyebrowVariation?: "left" | "center";
    eyebrowColor?: ColorVariables;
    starColor?: ColorVariables;
    header: string;
    headingLevel?: Exclude<HeadingLevelProps, "h1">;
    headingClass?: HeadingClassProps;
}) {
    const Heading = headingLevel;

    return (
        <>
            {eyebrow && (
                <Eyebrow
                    styleOptions={{
                        variation: eyebrowVariation,
                        color: eyebrowColor,
                        starColor: starColor,
                    }}
                    text={eyebrow}
                    className={"mwc-animate"}
                />
            )}

            <Heading
                className={`heading-md mwc-animate ${headingClass} [&>strong]:font-normal [&>strong]:text-gold`}
            >
                {header}
            </Heading>
        </>
    );
}

function SubtitleCopyOnly({
    subtitle,
    subtitleExtra,
    borderColor,
}: {
    subtitle: string;
    subtitleExtra: boolean;
    borderColor: ColorVariables;
}) {
    return (
        <h4
            className={cn(
                "mwc-animate",
                subtitleExtra ? "subtitle-extra" : "subtitle",
            )}
            style={{
                borderTop: `2px solid var(${borderColor})`,
                borderBottom: `2px solid var(${borderColor})`,
            }}
        >
            {subtitle}
        </h4>
    );
}

function BodyCopyOnly({
    body,
    bodySize = "body",
}: {
    body: string;
    bodySize?: BodyClassProps;
}) {
    const hasHtmlTags = (body: string) => /<[a-z][\s\S]*>/i.test(body);

    if (hasHtmlTags(body)) {
        return (
            <div
                className={`mwc-animate ${bodySize}`}
                dangerouslySetInnerHTML={{ __html: body }}
            />
        );
    }

    return <p className={`mwc-animate ${bodySize}`}>{body}</p>;
}

function BtnsCopyOnly({
    buttons,
    customBtnVariantMap = THREE_BUTTON_DEFAULTS.variantMap,
    customBtnColorSchemeMap = THREE_BUTTON_DEFAULTS.colorSchemeMap,
    centered = false,
}: {
    buttons: ThreeButtonsArray;
    customBtnVariantMap?: BtnVariantMap<3>;
    customBtnColorSchemeMap?: BtnAnySchemeMap<3>;
    centered?: boolean;
}) {
    return (
        <ThreeButtons
            className={cn("mwc-animate", centered && "justify-center")}
            noDecorationMap={true}
            buttons={buttons}
            customVariantMap={customBtnVariantMap}
            customColorSchemeMap={customBtnColorSchemeMap}
        />
    );
}

// #endregion ----------------------------------------------------------------------
