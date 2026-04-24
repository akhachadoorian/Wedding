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
        buttons: {
            fields: ["Button 1", "Button 2"],
            shape: { btnText: "content", link: "link" },
        }
    }
};

const CopyOnlyMapping: Array<MappingConfig> = [
    {
        source: "Home",
        section: "Welcome Copy",
        componentMap: CopyOnlyProps
    }
]


export default CopyOnlyMapping;