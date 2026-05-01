import './SmallText.scss';
import React from 'react';

export type SmallTextProps = {
    eyebrow?: string;
    title?: string;
    body?: string;
    variation: 'center' | 'left' | 'right';
    mobileVariation? : 'center' | 'left' | 'right';

    ref?: React.Ref<HTMLDivElement>;
}

export default function SmallText({eyebrow, title, body, variation = 'left', mobileVariation, ref}:SmallTextProps) {
    return (
        <div ref={ref} className='small_text-wrapper'>
            <div className={`small_text-inner ${variation} ${mobileVariation ? `small_text-mobile-${mobileVariation}`: ''}`}>
                {eyebrow && <p className='eyebrow gold'>{eyebrow}</p>}
                {title && <h5 className='heading-s'>{title}</h5>}
                {body && <p className='body-xs'>{body}</p>}
            </div>
        </div>
    )
}


