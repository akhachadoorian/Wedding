import './LineSeparatedContent.scss';

function LineSeparatedContent({left_content, right_content}) {
    return (
        <div className="line_separated_content-wrapper">
            {left_content && <p className="eyebrow white">{left_content}</p>}

            <div className="line_separated_content-line"></div>

            {right_content && <p className="eyebrow white">{right_content}</p>}
        </div>
    )
}

export default LineSeparatedContent;