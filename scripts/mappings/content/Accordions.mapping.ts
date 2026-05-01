import type { ComponentMappingProps, MappingConfig } from "../../core/types";

const AccordionsProps: ComponentMappingProps = {
    component: "Accordions",
    componentPath: "../components/Accordions/Accordions",
    propsImport: "Omit<AccordionsProps, 'className'>",
    props: {
        accordions: {
            shape: { question: "Question", answer: "Answer" },
        },
    },
};

const AccordionsMapping: Array<MappingConfig> = [
    {
        source: "Details",
        section: "FAQ Items",
        componentMap: AccordionsProps,
    },
];

export default AccordionsMapping;
