import type { ComponentMappingProps, MappingConfig } from "../../core/types";

const MediaWithCopyProps: ComponentMappingProps  = {
    component: "MediaWithCopy",
    componentPath: "../components/MediaWithCopy/MediaWithCopy",
    propsImport: 'Omit<MediaWithCopyProps, "media_side" | "headingSize">',
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
        },

        'img.src': {
            field: "Image",
            column: "content",
        },
        'img.alt': {
            field: "Image",
            column: "Alt",
        },

        'note.icon': {
            field: "Note Icon",
            column: "content",
        },
        'note.title': {
            field: "Note Title",
            column: "content",
        },
        'note.body': {
            field: "Note Body",
            column: "content",
        },

    }
};

const MediaWithCopyMapping: Array<MappingConfig> = [
    {
        source: "Details",
        section: "Venue",
        componentMap: MediaWithCopyProps
    },
]


export default MediaWithCopyMapping;