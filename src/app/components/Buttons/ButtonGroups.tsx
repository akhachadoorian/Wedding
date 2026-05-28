import { BtnDecoration, ButtonSettingProps, ThreeButtonsProps, TwoButtonsProps } from "../../types/buttons";
import Button from "./Button";
import { THREE_BUTTON_DEFAULTS, TWO_BUTTON_DEFAULTS } from "./defaults";

function mapButtonSettings({ 
    settings, 
    decoration
    // noDecorationMap 
}: {
    settings:ButtonSettingProps;
    decoration?: BtnDecoration | false;
    // noDecorationMap: boolean;

}) {
    // let b;

    if (settings.type === "modal") {
        return {
            type: 'modal',
            text: settings.text,
            decoration: decoration ? decoration : settings.decoration,
            modalID: settings.modalID,
            modalContent: settings.modalContent
        } satisfies ButtonSettingProps;
    } else if (settings.type === "link") {
        return {
            type: 'link',
            text: settings.text,
            decoration: decoration ? decoration : settings.decoration,
            link: settings.link,
            target: settings.target ?? "_self",
        } satisfies ButtonSettingProps;
    }

    return null;
}

export function TwoButtons({
    buttons,

    customVariantMap = TWO_BUTTON_DEFAULTS.variantMap,
    customColorSchemeMap = TWO_BUTTON_DEFAULTS.colorSchemeMap,
    customDecorationMap = TWO_BUTTON_DEFAULTS.arrowDecorationMap,
    noDecorationMap = false,

    ...htmlProps
}: TwoButtonsProps) {
    return (
        <div {...htmlProps} className={`btns ${htmlProps.className ?? ""}`}>
            {buttons?.map((btn, idx) => {
                let settings = mapButtonSettings({settings: btn, decoration: noDecorationMap ? false : customDecorationMap[idx]});
                if (settings == null) return;

                return (
                    <Button
                        key={idx}
                        variant={customVariantMap[idx]}
                        colorScheme={customColorSchemeMap[idx]}
                        btnSettings={settings}
                    />
                );
            })}
        </div>
    );
}

export function ThreeButtons({
    buttons,

    customVariantMap = THREE_BUTTON_DEFAULTS.variantMap,
    customColorSchemeMap = THREE_BUTTON_DEFAULTS.colorSchemeMap,
    customDecorationMap = THREE_BUTTON_DEFAULTS.arrowDecorationMap,
    noDecorationMap = false,

    ...htmlProps
}: ThreeButtonsProps) {
    return (
        <div {...htmlProps} className={`btns ${htmlProps.className ?? ""}`}>
            {buttons?.map((btn, idx) => {
                let settings = mapButtonSettings({settings: btn, decoration: noDecorationMap ? false : customDecorationMap[idx]});
                if (settings == null) return;

                return (
                    <Button
                        key={idx}
                        variant={customVariantMap[idx]}
                        colorScheme={customColorSchemeMap[idx]}
                        btnSettings={settings}
                    />
                );
            })}
        </div>
    );
}
