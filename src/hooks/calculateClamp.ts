import { ClampSize } from "../types/size";

const DESKTOP_SCREEN_SIZE = 1440;
const MOBILE_SCREEN_SIZE = 375;


type CalculateClampProps = {
    mobile?: boolean;
    size: ClampSize;
}


export function CalculateClamp({size, mobile = false}:CalculateClampProps) {
    let screenSize = mobile ? MOBILE_SCREEN_SIZE : DESKTOP_SCREEN_SIZE;


    let desiredVW = (size.desiredSize / screenSize) * 100;
    let clampSize = `clamp(${size.minSize}px, ${desiredVW.toFixed(3)}vw, ${size.maxSize}px)`;

    return clampSize;
}