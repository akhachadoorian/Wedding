import React from 'react';

/**
 * Common HTML element props shared across most wrapper components.
 *
 * @description
 * Use this as a base intersection when a component renders a single root div
 * and should accept standard styling and identification props from the outside.
 *
 * @example
 * type CardProps = WithHTMLProps & {
 *   title: string;
 * }
 */
export type WithHTMLProps = {
    /** CSS class name(s) added to the root element */
    className?: string;
    /** Inline styles applied to the root element */
    style?: React.CSSProperties;
    /** HTML id attribute for the root element */
    id?: string;
    /** Ref forwarded to the root div element */
    ref?: React.Ref<HTMLDivElement>;
}

// type ariaProps = {
//     label?: string;
//     labeledBy?: string;
//     describedBy?: string;
//     hidden?: string;
//     expanded?: string;
//     disabled?: string;
//     controls?: string;
// }

/**
 * Accessibility props for interactive or landmark elements.
 *
 * @description
 * Intersect this into a component's props when it needs to expose ARIA
 * attributes to consumers — e.g. modals, accordions, buttons, or any
 * element that carries semantic meaning beyond its visual appearance.
 *
 * @example
 * type AccordionProps = WithHTMLProps & WithA11yProps & {
 *   heading: string;
 * }
 */
export type WithA11yProps = {
    /** ARIA landmark or widget role */
    role?: React.AriaRole;
    /** Position in the tab order; use 0 to include, -1 to exclude */
    tabIndex?: number;
    /** Accessible name when visible text is absent or insufficient */
    'aria-label'?: string;
    /** ID of an element whose text labels this element */
    'aria-labelledby'?: string;
    /** ID of an element that provides an extended description */
    'aria-describedby'?: string;
    /** Hides the element from assistive technology when true */
    'aria-hidden'?: boolean;
    /** Indicates whether a collapsible section is open */
    'aria-expanded'?: boolean;
    /** Marks the element as non-interactive when true */
    'aria-disabled'?: boolean;
    /** ID of the element this control expands or manages */
    'aria-controls'?: string;
}

/**
 * Common DOM event handler props for div-based components.
 *
 * @description
 * Intersect this into a component's props when the root element needs to
 * respond to user interaction. Prefer attaching handlers at the component
 * boundary rather than drilling them through multiple layers.
 *
 * @example
 * type ClickableCardProps = WithHTMLProps & WithEventProps & {
 *   title: string;
 * }
 */
export type WithEventProps = {
    /** Fires when the element is clicked */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    /** Fires when a key is pressed down while the element is focused */
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    /** Fires when a key is released while the element is focused */
    onKeyUp?: React.KeyboardEventHandler<HTMLDivElement>;
    /** Fires when the element or a descendant receives focus */
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    /** Fires when the element or a descendant loses focus */
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    /** Fires when the pointer moves onto the element */
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    /** Fires when the pointer moves off the element */
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}
