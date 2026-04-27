import './SmallText.scss';
import React from 'react';

export type SmallTextProps = {
    eyebrow?: string;
    title?: string;
    body?: string;
    variation: 'center' | 'left' | 'right';
}

export default function SmallText({eyebrow, title, body, variation = 'left'}:SmallTextProps) {
    return (
        <div className='small_text-wrapper'>
            <div className={`small_text-inner ${variation}`}>
                {eyebrow && <p className='eyebrow gold'>{eyebrow}</p>}
                {title && <h5 className='heading-s'>{title}</h5>}
                {body && <p className='body-xs'>{body}</p>}
            </div>
        </div>
    )
}