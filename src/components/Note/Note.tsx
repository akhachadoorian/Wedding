import ReactMarkdown from 'react-markdown';
import './Note.scss';
import React from 'react';
import { InfoIcon, QuestionIcon, WarningDiamondIcon } from '@phosphor-icons/react';
import { ColorVariables } from '../../types/colors';

export type NoteProps = {
    className?: string;
    variation: 'center' | 'left';
    backgroundColor?: ColorVariables;
    icon?: 'info' | 'warning' | 'question';
    title?: string;
    body?: string;
    
}

export default function Note({className, variation = 'left', backgroundColor = "--black-900",icon ='info', title, body}:NoteProps) {
    let IconComponent = icon === 'warning' ? WarningDiamondIcon : icon === 'question' ? QuestionIcon : InfoIcon;

    if (!title) {
        return (
        <div className={`note-wrapper ${className ?? ''} note-${variation} wout_title`}  style={{backgroundColor: `var(${backgroundColor})`}}>
            <IconComponent color='var(--cream-500)' size={18}/>

            {body && <ReactMarkdown components={{ p: ({ children }) => <p className={"body-xs note-body"}>{children}</p> }}>{body}</ReactMarkdown>}
        </div>
    )
    }

    return (
        <div className={`note-wrapper ${className ?? ''} note-${variation}`} style={{backgroundColor: `var(${backgroundColor})`}}>
            <div className='note-text_upper'>
                <IconComponent color='var(--cream-500)' size={18}/>
                <p className='note-title'>{title}</p>
            </div>

            {body && <ReactMarkdown components={{ p: ({ children }) => <p className={"body-xs note-body"}>{children}</p> }}>{body}</ReactMarkdown>}
        </div>
    )
}