type generateSectionClassProps = {
    sectionPrefix: string;
    className: string;
};

export default function generateSectionClass({ sectionPrefix, className }: generateSectionClassProps) {
    const section = `${sectionPrefix}-section`;
    
    if (section === className) {
        return `${className}`;
    } else {
        return section;
    }
}
