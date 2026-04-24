import type { ComponentMappingProps, MappingConfig } from "../../core/types";

const DashedCopyProps: ComponentMappingProps = {
    component: "DashedCopyGrid",
    componentPath: "../components/DashedCopy/DashedCopy",
    propsImport: "DashedCopyGridProps",
    props: {
        dashedCopy: {
            shape: { leftCopy: "Left Content", rightCopy: "Right Content" },
        },
    },
};

const DashedCopyMapping: Array<MappingConfig> = [
    {
        source: "Home",
        section: "Welcome Info",
        componentMap: DashedCopyProps,
    },
];

export default DashedCopyMapping;
