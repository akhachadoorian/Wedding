import { ARROW_DIRECTIONS } from "../components/ArrowBox/ArrowBox";
import { MaxThree } from "./utility";

/** Text content, destination, and link behavior for a single button */
export type ButtonSettingProps = {
    /** Label displayed inside the button */
    btnText: string,
    /** React Router path or URL the button links to */
    link: string,
    /** Whether the link opens in a new tab @default '_self' */
    target?: '_blank' | '_self'
};

/**
 * 
 */
type BtnArrowSettings = {
    arrowSide?: 'left' | 'right';
    arrowDirection: ARROW_DIRECTIONS;
}

export type ButtonProps = {
    /** Extra CSS class added to the outer wrapper div */
    className?: string

    /** Text content and link destination */
    btnSettings: ButtonSettingProps

    /** Visual style variant @default 'solid' */
    style: 'solid' | 'outline' | 'lines'
    /** Color theme applied to the button and arrow */
    theme: 'gold' | 'cream' | 'black'
    
    /** whether to display the arrow @default true */
    includeArrow?: boolean;
    /** */
    arrowSettings?: BtnArrowSettings
};


/**
 * Type to have a three button array
 */
export type ThreeButtons = MaxThree<ButtonSettingProps>;
