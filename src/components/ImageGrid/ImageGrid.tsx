import { ImageProps } from "../../types/images";

import "./ImageGrid.scss";

export type ImageGridProps = {
    curvedImg?: ImageProps;
    curvedImgCaption?: string;
    squareImg?: ImageProps;
    squareImgCaption?: string;
};

const FanSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="674" height="422" viewBox="0 0 674 422" fill="none">
        <path d="M336.769 420.126L1.25024 362.53M336.769 420.126L11.7352 273.519M336.769 420.126L43.1901 168.8M336.769 420.126L106.1 85.0252M336.769 420.126L200.464 22.1938M336.769 420.126V1.25M336.769 420.126L473.073 22.1937M336.769 420.126L567.438 85.0251M336.769 420.126L630.347 168.8M336.769 420.126L661.802 273.519M336.769 420.126L672.287 362.53M1.25029 420.126H672.287" stroke="#A6824A" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);

export default function ImageGrid({ curvedImg, curvedImgCaption, squareImg, squareImgCaption }: ImageGridProps) {
    return (
        <div className="image_grid-wrapper">
            <div className="image_grid-inner">
                <div className="curved_img-wrapper image_grid-img ">
                    <div className="img-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 632 632" style={{ width: "100%", height: "100%", display: "block" }}>
                            <defs>
                                <clipPath id="curvedCorner">
                                    <path d="M0 350C0 156.7 156.7 0 350 0H630V630H0V350Z" />
                                </clipPath>
                            </defs>
                            <image href={curvedImg?.src ?? "/images/Max&Alex.jpg"} width="630" height="630" preserveAspectRatio="xMidYMid slice" clipPath="url(#curvedCorner)" className="img-bw" />

                            {/* Overlay inside */}
                            <rect x="0" y="0" width="630" height="630" fill="rgba(16,17,17,0.3)" clipPath="url(#curvedCorner)" />
                            <path d="M0 350C0 156.7 156.7 0 350 0H630V630H0V350Z" stroke="#A6824A" strokeWidth="2" fill="none" />
                        </svg>
                    </div>

                    <div className="image_grid-sun">
                        <FanSVG />
                    </div>

                    {curvedImgCaption && <p className="eyebrow image_grid-caption">{curvedImgCaption}</p>}
                </div>

                <div className="square_img-wrapper image_grid-img ">
                    <div className="img-wrapper">
                        <div className="img-holder">
                            <img src={squareImg?.src ?? "/images/Max&Alex.jpg"} alt={squareImg?.alt ?? "Max and Alex posed on a bridge."} className="img-bw" loading="lazy" decoding="async" />
                        </div>

                        <div className="img-overlay"></div>
                    </div>

                    {squareImgCaption && <p className="eyebrow image_grid-caption">{squareImgCaption}</p>}
                </div>
            </div>
        </div>
    );
}
