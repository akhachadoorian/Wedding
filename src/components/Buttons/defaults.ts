import { BtnArrowSettings, BtnColorSchemeMap, BtnDecorationMap, BtnVariantMap } from "../../types/buttons";
import { ArrowDirectionProps } from "../ArrowBox/ArrowBox";

// #region Btn Arrow Defaults
const RIGHT_ARROW: BtnArrowSettings = {
    type: "arrow",
    arrowSide: "right",
    arrowDirection: "right",
} satisfies BtnArrowSettings;

const TOP_RIGHT_ARROW: BtnArrowSettings = {
    type: "arrow",
    arrowSide: "right",
    arrowDirection: "top-right",
} satisfies BtnArrowSettings;

const LEFT_ARROW: BtnArrowSettings = {
    type: "arrow",
    arrowSide: "left",
    arrowDirection: "left",
} satisfies BtnArrowSettings;

function createArrowArray<N extends number>({size, arrowDefault}: {size: N, arrowDefault?: BtnArrowSettings}): BtnDecorationMap<N> {
    return new Array(size).fill(arrowDefault ?? TOP_RIGHT_ARROW) as BtnDecorationMap<N>;
}

// #endregion

// #region Two Button Defaults

const TWO_BUTTON_DEFAULTS_VARIANT_MAP: BtnVariantMap<2> = ["solid", "lines"];
const TWO_BUTTON_DEFAULTS_COLOR_SCHEME: BtnColorSchemeMap<2> = ["gold", "cream"];
const TWO_BUTTON_DEFAULTS_ARROW: BtnDecorationMap<2> = createArrowArray({size:2, arrowDefault:TOP_RIGHT_ARROW});

export const TWO_BUTTON_DEFAULTS = {
    variantMap: TWO_BUTTON_DEFAULTS_VARIANT_MAP,
    colorSchemeMap: TWO_BUTTON_DEFAULTS_COLOR_SCHEME,
    arrowDecorationMap: TWO_BUTTON_DEFAULTS_ARROW,
};

// #endregion

// #region
const THREE_BTNS_DEFAULT_VARIANT_MAP: BtnVariantMap<3> = ["solid", "outline", "lines"];

const THREE_BTNS_DEFAULT_COLOR_SCHEME_MAP: BtnColorSchemeMap<3> = ["gold", "gold", "cream"];

const THREE_BUTTON_DEFAULTS_ARROW: BtnDecorationMap<3> = createArrowArray({size:3, arrowDefault:TOP_RIGHT_ARROW});

export const THREE_BUTTON_DEFAULTS = {
    variantMap: THREE_BTNS_DEFAULT_VARIANT_MAP,
    colorSchemeMap: THREE_BTNS_DEFAULT_COLOR_SCHEME_MAP,
    arrowDecorationMap: THREE_BUTTON_DEFAULTS_ARROW
};

// #endregion
