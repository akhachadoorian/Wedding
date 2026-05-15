import { ThreeButtonsProps, TwoButtonsProps } from "../../types/buttons";
import Button from "./Button";
import { THREE_BUTTON_DEFAULTS, TWO_BUTTON_DEFAULTS } from "./defaults";


export function TwoButtons({ 
    buttons,

    customVariantMap = TWO_BUTTON_DEFAULTS.variantMap, 
    customColorSchemeMap = TWO_BUTTON_DEFAULTS.colorSchemeMap, 
    customDecorationMap = TWO_BUTTON_DEFAULTS.arrowDecorationMap,
    noDecorationMap = false,

    ...htmlProps 
}: TwoButtonsProps) {
    return (
        <div {...htmlProps } className={`btns ${htmlProps.className ?? ''}`}>
            {buttons?.map((btn, idx) => {
                return (
                    <Button
                        key={idx}
                        variant={customVariantMap[idx]}
                        colorScheme={customColorSchemeMap[idx]}
                        btnSettings={{
                            text: btn.text,
                            link: btn.link,
                            target: btn.target ?? "_self",
                            decoration: noDecorationMap ? btn.decoration : customDecorationMap[idx]
                        }}
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
        <div {...htmlProps } className={`btns ${htmlProps.className ?? ''}`}>
            {buttons?.map((btn, idx) => {
                return (
                    <Button
                        key={idx}
                        variant={customVariantMap[idx]}
                        colorScheme={customColorSchemeMap[idx]}
                        btnSettings={{
                            text: btn.text,
                            link: btn.link,
                            target: btn.target ?? "_self",
                            decoration: noDecorationMap ? btn.decoration : customDecorationMap[idx]
                        }}
                    />
                );
            })}
        </div>
    );
};
