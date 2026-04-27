import type { ComponentMappingProps, MappingConfig } from "../../core/types";

const CopyOnlyProps: ComponentMappingProps  = {
    component: "CopyOnly",
    componentPath: "../components/CopyOnly/CopyOnly",
    propsImport: 'Omit<CopyOnlyProps, "variation" | "headingSize">',
    props: {
        eyebrow: {
            field: "Eyebrow",
            column: "content",
            transform: (val) => val.split(" & ")[0].trim(),
        },
        header: {
            field: "Heading",
            column: "content",
            transform: (val) => val.split(" & ")[0].trim(),
        },
        subtitle: {
            field: "Subtitle",
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
        }
    }
};

const CopyOnlyMapping: Array<MappingConfig> = [
    {
        source: "Home",
        section: "Welcome Copy",
        componentMap: CopyOnlyProps
    },
    {
        source: "Home",
        section: "Quick Navigation Copy",
        componentMap: CopyOnlyProps
    },

    {
        source: "Details",
        section: "Timeline",
        componentMap: CopyOnlyProps
    },
    {
        source: "Details",
        section: "Dress Code",
        componentMap: CopyOnlyProps
    },
    {
        source: "Details",
        section: "Wedding Party",
        componentMap: CopyOnlyProps
    },
    {
        source: "Details",
        section: "FAQs",
        componentMap: CopyOnlyProps
    },
]


export default CopyOnlyMapping;