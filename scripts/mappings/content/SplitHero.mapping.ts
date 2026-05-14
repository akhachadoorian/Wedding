// scripts/mappings/SplitHero.mapping.ts
// Defines how vault content in Home.md > ## Hero maps to SplitHero props
import type { ComponentMappingProps, MappingConfig } from "../../core/types";

const SplitHeroProps: ComponentMappingProps = {
    component: "SplitHero",
    componentPath: "../components/heros/SplitHero/SplitHero",
    propsImport: 'Omit<SplitHeroProps, "loaded">',
    props: {
        "heading.line1": {
            field: "Heading",
            transform: (val) => val.split(" & ")[0].trim(),
        },
        "heading.line2": {
            field: "Heading",
            transform: (val) => "& " + val.split(" & ")[1].trim(),
        },
        "eyebrow.variation": {
            value: "double",
        },
        "eyebrow.text": {
            field: "Eyebrow",
            transform: (val) => val.split(" · ")[0].trim(),
        },
        "eyebrow.doubleText": {
            field: "Eyebrow",
            transform: (val) => val.split(" · ")[1].trim(),
        },

        "btn.text": {
            field: "CTA Button",
            column: "content",
        },
        "btn.link": {
            field: "CTA Button",
            column: "link",
        },

        "image.src": {
            field: "Image",
            column: "content",
        },
        "image.alt": {
            field: "Image",
            column: "alt",
        },
    },
};

const SplitHeroMapping: Array<MappingConfig> = [
    {
        source: "Home",
        section: "Hero",
        componentMap: SplitHeroProps,
    },
];

export default SplitHeroMapping;
