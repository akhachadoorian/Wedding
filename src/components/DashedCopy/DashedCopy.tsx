import { NonEmptyArray } from '../../types/utility';
import './DashedCopy.scss';

export type DashedCopyProps = {
    leftCopy?: string;
    rightCopy?: string;
}

export type DashedCopyGridProps = {
    dashedCopy: NonEmptyArray<DashedCopyProps>
}
    

export function DashedCopy({leftCopy, rightCopy}: DashedCopyProps) {
    return (
        <div className="dashed_copy-wrapper">
            {leftCopy && <p className="eyebrow white left-copy">{leftCopy}</p>}

            <div className="dashed_copy-line"></div>

            {rightCopy && <p className="eyebrow white right-copy">{rightCopy}</p>}
        </div>
    )
}

// export default LineSeparatedContent;

export default function DashedCopyGrid({dashedCopy}: DashedCopyGridProps) {
    return (
        <div className="dashed_copy_grid-wrapper">
            <div className="dashed_copy_grid">
                {dashedCopy.map((d, idx) => (
                    <DashedCopy key={idx} leftCopy={d.leftCopy} rightCopy={d.rightCopy} />
                ))}
            </div>
        </div>
    )
}