import ReactMarkdown from "react-markdown";

import { ThreeButtonsArray } from "../../types/buttons";
import { ThreeButtons } from "../Buttons/ButtonGroups";
import Eyebrow from "../Eyebrow/Eyebrow";

import "./CopyOnly.scss";
import { ColorVariables } from "../../types/colors";
import { useFadeInChildren } from "../../hooks/useFadeIn";

/**
 * Controls the visual layout and color treatment of the CopyOnly component.
 *
 * @property variation   - Layout mode: `left` (single column, left-aligned),
 *                         `center` (single column, centered), or `columns`
 *                         (two-column split with heading left and body right).
 * @property headingSize - Semantic heading level rendered for `header`. Defaults to `h2`.
 * @property eyebrowColor - CSS variable token for the eyebrow label color.
 * @property textColor   - `dark` renders stone-1000 text; `light` renders stone-000 (for dark backgrounds).
 */
type CopyOnlyStyleProps = {
    variation: "left" | "center" | "columns";
    headingSize?: "h2" | "h3" | "h4";
    eyebrowColor?: ColorVariables;
    textColor?: "light" | "dark";
};

const DEFAULT_STYLE = {
    variation: "left",
    headingSize: "h2",
    eyebrowColor: "--gold-500",
    textColor: "light",
} satisfies CopyOnlyStyleProps;

/**
 * Props for the CopyOnly component.
 *
 * @property className    - Additional CSS class(es) applied to the root element.
 * @property styleOptions - Layout and color configuration. See {@link CopyOnlyStyleProps}.
 * @property eyebrow      - Optional small label rendered above the heading.
 * @property header       - Primary heading text (required).
 * @property subtitle     - Optional secondary heading rendered as `h5`.
 * @property body         - Optional body copy. Accepts raw HTML strings — rendered via
 *                          `dangerouslySetInnerHTML` when HTML tags are detected.
 * @property buttons      - Up to three CTA buttons rendered below the body copy.
 */
export type CopyOnlyProps = {
    /** Additional CSS class(es) applied to the root element. */
    className?: string;

    // Style Options
    styleOptions: CopyOnlyStyleProps;

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
    className,
    styleOptions = DEFAULT_STYLE,
    eyebrow,
    header,
    subtitle,
    body,
    buttons,
}: CopyOnlyProps) {
    // Eyebrow centering only applies to the `center` layout variation.
    const eyebrowVariation =
        styleOptions.variation === "center" ? "center" : "left";
        
    const ref = useFadeInChildren<HTMLDivElement>(".mwc-animate", {
        stagger: 0.15,
        y: 24,
    });

    const Heading = styleOptions.headingSize ?? "h2";
    // Detect inline HTML so rich-text body strings are rendered correctly.
    // const hasHtmlTags = (body: string) => /<[a-z][\s\S]*>/i.test(body);

    if (styleOptions.variation === "columns") {
        return (
            <div
                ref={ref}
                className={`copy copy-${styleOptions.textColor ?? DEFAULT_STYLE.textColor} ${className ?? ''}`}
            >
                <div className={`copy-inner copy-${styleOptions.variation}`}>
                    <div className="copy-left_col">
                        {eyebrow && (
                            <Eyebrow
                                styleOptions={{
                                    variation: eyebrowVariation ?? DEFAULT_STYLE.variation,
                                    color: styleOptions.eyebrowColor ?? DEFAULT_STYLE.eyebrowColor
                                }}
                                text={eyebrow}
                                className={"mwc-animate"}
                            />
                        )}

                        {/* <Heading className="copy-header heading-md mwc-animate">
                            {header}
                        </Heading> */}

                        <ReactMarkdown
                            components={{
                                p: ({ children }) => <Heading className="copy-header mwc-animate">{children}</Heading>,
                            }}
                        >{header}</ReactMarkdown>
                    </div>

                    <div className="copy-right_col">
                        {subtitle && (
                            <h5 className="subtitle mwc-animate">{subtitle}</h5>
                        )}

                        {body && <ReactMarkdown components={{ p: ({ children }) => <p className={`mwc-animate copy-body ${styleOptions.headingSize === "h2" ? "body-l" : "body"}`}>{children}</p> }}>{body}</ReactMarkdown>}

                        {buttons && (
                            <ThreeButtons
                                className="copy-btns btns mwc-animate"
                                buttons={buttons ?? []}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            className={`copy copy-${styleOptions.textColor ?? DEFAULT_STYLE.textColor} ${className ?? ''}`}
        >
            <div className={`copy-inner copy-${styleOptions.variation}`}>
                <div className="copy-text">
                    <div className="copy-upper">
                        {eyebrow && (
                            <Eyebrow
                                styleOptions={{
                                    variation: eyebrowVariation ?? DEFAULT_STYLE.variation,
                                    color: styleOptions.eyebrowColor ?? DEFAULT_STYLE.eyebrowColor
                                }}
                                text={eyebrow}
                                className={"mwc-animate"}
                            />
                        )}

                        {/* <Heading className="copy-header heading-md mwc-animate">
                            {header}
                        </Heading> */}

                        <ReactMarkdown
                            components={{
                                p: ({ children }) => <Heading className="copy-header mwc-animate">{children}</Heading>,
                            }}
                        >{header}</ReactMarkdown>
                    </div>

                    {subtitle && (
                        <h5 className="subtitle mwc-animate">{subtitle}</h5>
                    )}

                    {/* {body && hasHtmlTags(body) ? (
                        <div
                            className={`copy-body mwc-animate ${styleOptions.headingSize === "h2" ? "body-l" : "body"}`}
                            dangerouslySetInnerHTML={{ __html: body }}
                        />
                    ) : (
                        <p
                            className={`mwc-animate copy-body ${styleOptions.headingSize === "h2" ? "body-l" : "body"}`}
                        >
                            {body}
                        </p>
                    )} */}

                    {body && <ReactMarkdown components={{ p: ({ children }) => <p className={`copy-body mwc-animate ${styleOptions.headingSize === "h2" ? "body-l" : "body"}`}>{children}</p> }}>{body}</ReactMarkdown>}
                </div>

                {buttons && (
                    <ThreeButtons
                        className="copy-btns btns mwc-animate"
                        buttons={buttons ?? []}
                    />
                )}
            </div>
        </div>
    );
}
