import Eyebrow from '../Eyebrow/Eyebrow';
import Note, { NoteProps } from '../Note/Note';
import './SplitInfo.scss'

export type SplitInfoProps = {
    className?: string;

    solidContent: SolidSplitInfoProps;
    outlineContent: OutlineSplitInfoProps;
}

export default function SplitInfo({className, solidContent, outlineContent}:SplitInfoProps) {
    return (
        <div className={`split_info ${className ?? ''}`}>
            <SolidSplitInfo {...solidContent} />

            <OutlineSplitInfo {...outlineContent} />
        </div>
    )
}


type SolidSplitInfoProps = {
    eyebrow?: string;
    header: string;
    body?: string;
    lowerText?: {
        header: string;
        body?: string;
    }
};

function SolidSplitInfo({eyebrow, header, body, lowerText}:SolidSplitInfoProps) {
    return (
        <div className='split_info-solid split_info-side'>
            <div className='split_info-solid-upper'>
                {eyebrow && <Eyebrow text={eyebrow} styleOptions={{variation: 'left', includeMargin: true}} />}

                <h2 className='split_info-solid-header'>{header}</h2>

                {body && <p className='split_info-solid-body body'>{body}</p>}
            </div>
            {lowerText && (
                <div className='split_info-solid-lower'>    
                    <p className='eyebrow split_info-solid-lower-header'>{lowerText.header}</p>
                    {lowerText.body && <p className='split_info-solid-lower-body body'>{lowerText.body}</p>}
                </div>
            )}
            
        </div>
    )
}

type OutlineSplitInfoProps = {
    eyebrow?: string;
    header: string;
    body?: string;

    // buttons

    // note?: NoteProps;
    note?: {
        icon?: 'info' | 'warning' | 'question';
        title?: string;
        body?: string;
    }
};

function OutlineSplitInfo({eyebrow, header, body, note}:OutlineSplitInfoProps) {
    return (
        <div className='split_info-outline split_info-side'>
            <div className='split_info-outline-text'>
                {eyebrow && <Eyebrow text={eyebrow} styleOptions={{variation: 'left', includeMargin: true}} />}

                <h3 className='split_info-outline-header heading-m'>{header}</h3>

                {body && <p className='split_info-outline-body body'>{body}</p>}
            </div>

            {/* <div className='split_info-outline-btns '></div> */}

            {note && (
                <Note 
                    className='split_info-outline-note'
                    variation='left'
                    icon={note.icon}
                    title={note.title}
                    body={note.body}
                />
                
            )}
            

        </div>
    )
}