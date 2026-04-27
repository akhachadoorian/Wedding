import type { ComponentMappingProps, MappingConfig } from "../../core/types";

const SmallTextTagHeroProps: ComponentMappingProps  = {
    component: "SmallTextTagHero",
    componentPath: "../components/heros/SmallTextTagHero/SmallTextTagHero",
    propsImport: 'Omit<SmallTextTagHeroProps, "loaded">',
    props: {
        eyebrow: {
            field: "Eyebrow",
            column: "content",
            transform: (val) => val.split(" & ")[0].trim(),
        },
        heading: {
            field: "Heading",
            column: "content",
            transform: (val) => val.split(" & ")[0].trim(),
        },
        body: {
            field: "Body",
            column: "content",
            transform: (val) => val.split(" & ")[0].trim(),
        },
        buttons: {
            fields: ["Button 1", "Button 2", "Button 3"],
            shape: { btnText: "content", link: "link", target: "target" },
        },

        "smallTextTag1.eyebrow": {
            field: "Tag 1 Eyebrow",
            column: "content",
        },
        "smallTextTag1.title": {
            field: "Tag 1 Title",
            column: "content",
        },
        "smallTextTag1.body": {
            field: "Tag 1 Body",
            column: "content",
        },

        "smallTextTag2.eyebrow": {
            field: "Tag 2 Eyebrow",
            column: "content",
        },
        "smallTextTag2.title": {
            field: "Tag 2 Title",
            column: "content",
        },
        "smallTextTag2.body": {
            field: "Tag 2 Body",
            column: "content",
        },
    }
};

const SmallTextTagHeroMapping: Array<MappingConfig> = [
    {
        source: "Details",
        section: "Hero",
        componentMap: SmallTextTagHeroProps
    },
]


export default SmallTextTagHeroMapping;