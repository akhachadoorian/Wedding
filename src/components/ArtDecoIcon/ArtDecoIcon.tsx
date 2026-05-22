import { ColorVariables } from "../../types/colors";
import { WithHTMLProps } from "../../types/props";

type ArtDecoIconProps = WithHTMLProps & {
    type: 'fan'
}

export default function ArtDecoIcon({
    type,

    className,
    ...htmlProps
}:ArtDecoIconProps) {
    return (
        <div className={`art_deco_icon ${className ?? ''}`}>
            
        </div>
    )
}

export type ArtDecoSVG = {
    colorScheme?: 'gold'
}

export const ART_DECO_ICON_COLOR_SCHEME_MAP: Record<string, Record<string, ColorVariables>> = {
    gold: {
        primary: '--gold-500',
        secondary: '--gold-600'
    }
}