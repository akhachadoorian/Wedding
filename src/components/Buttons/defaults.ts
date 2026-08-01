import {
    BtnArrowSettings,
    BtnDecorationMap,
    BtnFullSchemeMap,
    BtnSchemeMap,
    BtnVariantMap,
} from "../../types/buttons";

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

function createArrowArray<N extends number>({
    size,
    arrowDefault,
}: {
    size: N;
    arrowDefault?: BtnArrowSettings;
}): BtnDecorationMap<N> {
    return new Array(size).fill(
        arrowDefault ?? TOP_RIGHT_ARROW,
    ) as BtnDecorationMap<N>;
}

// #endregion

// #region Two Button Defaults

const TWO_BUTTON_DEFAULTS_VARIANT_MAP: BtnVariantMap<2> = ["solid", "lines"];

const TWO_BUTTON_DEFAULTS_COLOR_SCHEME: BtnSchemeMap<2> = {
    kind: "simple",
    scheme: ["burgundy", "burgundy"],
};
const TWO_BUTTON_DEFAULTS_HOVER_SCHEME: BtnSchemeMap<2> = {
    kind: "simple",
    scheme: ["cream", "cream"],
};

export const TWO_BUTTON_DEFAULTS_SCHEME: BtnFullSchemeMap<2> = {
    kind: "full",
    colorScheme: TWO_BUTTON_DEFAULTS_COLOR_SCHEME,
    hoverScheme: TWO_BUTTON_DEFAULTS_HOVER_SCHEME,
};

const TWO_BUTTON_DEFAULTS_ARROW: BtnDecorationMap<2> = createArrowArray({
    size: 2,
    arrowDefault: TOP_RIGHT_ARROW,
});

export const TWO_BUTTON_DEFAULTS = {
    variantMap: TWO_BUTTON_DEFAULTS_VARIANT_MAP,
    colorSchemeMap: TWO_BUTTON_DEFAULTS_SCHEME,
    arrowDecorationMap: TWO_BUTTON_DEFAULTS_ARROW,
};

// #endregion

// #region
const THREE_BTNS_DEFAULT_VARIANT_MAP: BtnVariantMap<3> = [
    "solid",
    "outline",
    "lines",
];

const THREE_BTNS_DEFAULT_COLOR_SCHEME_MAP: BtnSchemeMap<3> = {
    kind: "simple",
    scheme: ["burgundy", "burgundy", "burgundy"],
};
const THREE_BUTTON_DEFAULTS_HOVER_SCHEME: BtnSchemeMap<3> = {
    kind: "simple",
    scheme: ["cream", "cream", "burgundy"],
};

export const THREE_BTNS_DEFAULT_SCHEME_MAP: BtnFullSchemeMap<3> = {
    kind: "full",
    colorScheme: THREE_BTNS_DEFAULT_COLOR_SCHEME_MAP,
    hoverScheme: THREE_BUTTON_DEFAULTS_HOVER_SCHEME,
};

const THREE_BUTTON_DEFAULTS_ARROW: BtnDecorationMap<3> = createArrowArray({
    size: 3,
    arrowDefault: TOP_RIGHT_ARROW,
});

export const THREE_BUTTON_DEFAULTS = {
    variantMap: THREE_BTNS_DEFAULT_VARIANT_MAP,
    colorSchemeMap: THREE_BTNS_DEFAULT_SCHEME_MAP,
    arrowDecorationMap: THREE_BUTTON_DEFAULTS_ARROW,
};

// #endregion
