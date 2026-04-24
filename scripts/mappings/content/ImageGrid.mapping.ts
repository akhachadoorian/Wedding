import type { ComponentMappingProps, MappingConfig } from "../../core/types";

const ImageGridProps: ComponentMappingProps  = {
    component: "ImageGrid",
    componentPath: "../components/ImageGrid/ImageGrid",
    propsImport: 'ImageGridProps',
    props: {
        "curvedImg.src": {
            field: "Curved Image",
            column: "content",
        },
        "curvedImg.alt": {
            field: "Curved Image",
            column: "alt",
        },
        curvedImgCaption: {
            field: "Curved Image",
            column: "caption",
        },
        "squareImg.src": {
            field: "Square Image",
            column: "content",
        },
        "squareImg.alt": {
            field: "Square Image",
            column: "alt",
        },
        squareImgCaption: {
            field: "Square Image",
            column: "caption",
        },
    }
};

const ImageGridMapping: Array<MappingConfig> = [
    {
        source: "Home",
        section: "Photo Gallery",
        componentMap: ImageGridProps
    }
]


export default ImageGridMapping;

// export type ImageGridProps = {
//     curvedImg?: ImageProps;
//     curvedImgCaption?: string;
//     squareImg?: ImageProps;
//     squareImgCaption?: string;
// };