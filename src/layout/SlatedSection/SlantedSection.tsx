import { PropsWithChildren } from "react";
import { WithHTMLProps } from "../../types/props"
import { ColorVariables } from "../../types/colors";
import './SlantedSection.scss';

type SlantedSectionProps = WithHTMLProps & PropsWithChildren & {

    fill?: ColorVariables;
    slantSettings?: {
        depth?: "small" | "large";
        flipped?: boolean;
    } 
};

export default function SlantedSection({
    fill = "--black-900", 
    slantSettings,
    
    children,
    className,
    ...htmlProps
}: SlantedSectionProps) {
    return (
        <section {...htmlProps} className={`slanted-section ${className ?? ''}`}>
            <Slant fill={fill} edge="top"  {...slantSettings} />

            <div className={`slanted`} style={{backgroundColor: `var(${fill})`}}>
                {children}
            </div>

            <Slant fill={fill} edge="bottom"  {...slantSettings} />
            
        </section>
    )
}


type SlantProps = {
    // props: PropsWithChildren;
    fill?: ColorVariables;
    edge: "top" | "bottom";
    depth?: "small" | "large";
    flipped?: boolean;
};


function Slant({
    // props,
    edge,
    fill = "--black-900", 
    depth = "small", 
    flipped = false, 
}:SlantProps) {
    return (
        <div className={`slant slant-${depth} slant-${edge} ${flipped ? 'slant-flipped' : ''}`} style={{backgroundColor: `var(${fill})`}} />
    )
}