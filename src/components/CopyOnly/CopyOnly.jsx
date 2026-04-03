import Eyebrow from "../Eyebrow/Eyebrow";
import './CopyOnly.scss';

export default function CopyOnly({text, eyebrow, variation = "left" }) {
    return (
        <div className={`copy-wrapper ${variation}`}>
            {eyebrow ? 
                <Eyebrow 
                    text={eyebrow}
                    variation={variation}
                />
            :
                null
            }
            <div className="copy" dangerouslySetInnerHTML={{ __html: text }} />
        </div>
    )
}