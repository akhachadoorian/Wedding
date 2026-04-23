import type { ComponentMappingProps, MappingConfig } from "../../core/types";

const CopyOnlyProps: ComponentMappingProps  = {
    component: "CopyOnly",
    componentPath: "../components/CopyOnly/CopyOnly",
    propsImport: 'Omit<CopyOnlyProps, "variation" | "headingSize">',
    props: {
        eyebrow: {
            field: "Eyebrow",
            transform: (val) => val.split(" & ")[0].trim(),
        },
        header: {
            field: "Heading",
            transform: (val) => val.split(" & ")[0].trim(),
        },
        subtitle: {
            field: "Subtitle",
            transform: (val) => val.split(" & ")[0].trim(),
        },

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

