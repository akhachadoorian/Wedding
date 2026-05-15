import { WithHTMLProps } from '../../types/props';
import './SimpleTable.scss';


type SimpleTableProps = WithHTMLProps & {

};

export default function SimpleTable({

    className,
    ...htmlProps
}:SimpleTableProps) {
    return (
        <div {...htmlProps} className={`simple_table ${className ?? ''}`}>

        </div>
    )
}


// ---- Sub Elements ---------------------------------------------

type SimpleTableRow = {

};

function SimpleTableRow({}) {
    return (
        <div className='simple_table_row'>

        </div>
    )
}