import type { ComponentMappingProps, MappingConfig } from "../../core/types";

const DrinkCardGridProps: ComponentMappingProps = {
    component: "DrinkCardGrid",
    componentPath: "../components/DrinkCardGrid/DrinkCardGrid",
    propsImport: "DrinkCardGridProps",
    props: {
        drinkCards: {
            shape: {
                eyebrow:      "Eyebrow",
                title:        "Title",
                body:         "Body",
                link:         "Link",
                target:       "Target",
                drink1Type:   "Drink 1 Type",
                drink1Rotate: "Drink 1 Rotate",
                drink1RotateNeg: "Drink 1 Inverse Rotate",
                drink1HoverHeight: "Drink 1 Hover Height",
                drink2Type:   "Drink 2 Type",
                drink2Rotate: "Drink 2 Rotate",
                drink2RotateNeg: "Drink 2 Inverse Rotate",
                drink2HoverHeight: "Drink 2 Hover Height",
            },
            transform: (item) => ({
                eyebrow: item.eyebrow,
                title:   item.title,
                body:    item.body,
                link:    item.link,
                target:  item.target,
                drinks: [
                    { type: item.drink1Type, rotate: item.drink1Rotate, rotateNeg: item.drink1RotateNeg === "true", hoverHeight: item.drink1HoverHeight },
                    { type: item.drink2Type, rotate: item.drink2Rotate, rotateNeg: item.drink2RotateNeg === "true", hoverHeight: item.drink2HoverHeight },
                ].filter((d) => d.type),
            }),
        },
    },
};

const DrinkCardGridMapping: Array<MappingConfig> = [
    {
        source: "Home",
        section: "Quick Navigation Cards",
        componentMap: DrinkCardGridProps,
    },
];

export default DrinkCardGridMapping;
