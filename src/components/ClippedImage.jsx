import React from "react";

function ClippedImage({ image, image_alt, variation = "arch" }) {


    return (
            <div className={`clipped_image ${variation}`} >
                <img src={image} alt={image_alt} />
            </div>
        
    );
}

export default ClippedImage;
