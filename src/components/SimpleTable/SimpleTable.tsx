import { ButtonSettingProps } from "../../types/buttons";
import { WithHTMLProps } from "../../types/props";
import { NonEmptyArray } from "../../types/utility";
import Button from "../Buttons/Button";

import "./SimpleTable.scss";

/**
 * Props for the {@link SimpleTable} component.
 * 
 * @see {@link WithHTMLProps} for inherited styling and layout props.
 */
type SimpleTableProps = WithHTMLProps & {
    /** A non-emp array of table rows */
    rows: NonEmptyArray<SimpleTableRowProps>;
};

export default function SimpleTable({ rows, className, ...htmlProps }: SimpleTableProps) {
    return (
        <div {...htmlProps} className={`simple_table ${className ?? ""}`}>
            {rows.map((r, idx) => (
                <SimpleTableRow key={idx} {...r} />
            ))}
        </div>
    );
}

// #region --- SimpleTableRow --------------------------------

/**
 * Props for the {@link SimpleTableRow} component.
 */
type SimpleTableRowProps = {
    /** A non-emp array of rows elements */
    row: NonEmptyArray<SimpleTableElementProps>;
    /** Determines whether the row has the title row class */
    isTitleRow?: boolean;
};

/**
 * 
 */
function SimpleTableRow({ row, isTitleRow }: SimpleTableRowProps) {
    return (
        <div className={`simple_table_row ${isTitleRow ? 'simple_table_row-title' : ''}`}>
            {row.map((r, idx) =>
                r.type === "time" ? (
                    <SimpleTableElementTime {...r} key={idx} />
                ) : r.type === "title" ? (
                    <SimpleTableElementTitle {...r} key={idx} />
                ) : r.type === "body" ? (
                    <SimpleTableElementBody {...r} key={idx} />
                ) : r.type === "button" ? (
                    <SimpleTableElementButton {...r} key={idx} />
                ) : r.type === "html" ? (
                    <SimpleTableElementHTML {...r} key={idx} />
                ) : null,
            )}
        </div>
    );
}

// #endregion --------------------------------------------------

// #region 

type SimpleTableElementProps = SimpleTableElementTimeProps | SimpleTableElementTitleProps | SimpleTableElementBodyProps | SimpleTableElementButtonProps | SimpleTableElementHTMLProps;

// #endregion

type SimpleTableElementTimeProps = {
    type: "time";
    time: string;
};

function SimpleTableElementTime({ type, time }: SimpleTableElementTimeProps) {
    return <p className="simple_table_element-time">{time}</p>;
}

type SimpleTableElementTitleProps = {
    type: "title";
    title: string;
};

function SimpleTableElementTitle({ type, title }: SimpleTableElementTitleProps) {
    return <p className="simple_table_element-title ">{title}</p>;
}

type SimpleTableElementBodyProps = {
    type: "body";
    body: string;
};

function SimpleTableElementBody({ type, body }: SimpleTableElementBodyProps) {
    return <p className="simple_table_element-body">{body}</p>;
}

type SimpleTableElementButtonProps = {
    type: "button";
    button: ButtonSettingProps;
};

function SimpleTableElementButton({ type, button }: SimpleTableElementButtonProps) {
    return <Button className="simple_table_element-btn" btnSettings={button} colorScheme="gold" variant="outline" />;
}

type SimpleTableElementHTMLProps = {
    type: "html";
    html: string;
};

function SimpleTableElementHTML({ type, html }: SimpleTableElementHTMLProps) {
    return <div className="simple_table_element-html" dangerouslySetInnerHTML={{ __html: html }}></div>;
}


