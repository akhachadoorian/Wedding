'use client'

import React from "react";
import { ButtonSettingProps } from "../../types/buttons";
import { WithHTMLProps } from "../../types/props";
import { NonEmptyArray } from "../../types/utility";
import Button from "../Buttons/Button";

import "./SimpleTable.scss";
import { useFadeInChildren } from "../../hooks/useFadeIn";

/**
 * Props for the {@link SimpleTable} component.
 * 
 * @see {@link WithHTMLProps} for inherited styling and layout props.
 */
export type SimpleTableProps = WithHTMLProps & {
    /** A non-emp array of table rows */
    rows: NonEmptyArray<SimpleTableRowProps>;
};

export default function SimpleTable({ rows, className, ...htmlProps }: SimpleTableProps) {

    const ref = useFadeInChildren<HTMLDivElement>(".mwc-animate", {
            stagger: 0.15,
            y: 24,
        });

    return (
        <div {...htmlProps} ref={ref} className={`simple_table ${className ?? ""}`}>
            {rows.map((r, idx) => (
                <SimpleTableRow key={idx} className={'mwc-animate'} {...r} />
            ))}
        </div>
    );
}

// #region --- SimpleTableRow --------------------------------

/**
 * Props for the {@link SimpleTableRow} component.
 */
type SimpleTableRowProps = WithHTMLProps & {
    /** A non-emp array of rows elements */
    row: NonEmptyArray<SimpleTableElementProps>;
    /** Determines whether the row has the title row class */
    isTitleRow?: boolean;

};

/**
 * 
 */
function SimpleTableRow({ row, isTitleRow, className, ...htmlProps }: SimpleTableRowProps) {
    return (
        <div className={`simple_table_row ${isTitleRow ? 'simple_table_row-title' : ''} ${className ?? ''}`}>
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

// #region --- SimpleTable Element ------------------------------

type SimpleTableElementProps = SimpleTableElementTimeProps | SimpleTableElementTitleProps | SimpleTableElementBodyProps | SimpleTableElementButtonProps | SimpleTableElementHTMLProps;

// #endregion

type SimpleTableElementTimeProps = {
    type: "time";
    time: string;
};

function SimpleTableElementTime({ type, time }: SimpleTableElementTimeProps) {
    return (
        <div className="simple_table_element simple_table_element-time">
            <p className="heading-xs">{time}</p>
        </div>
    );
}

type SimpleTableElementTitleProps = {
    type: "title";
    title: string;
};

function SimpleTableElementTitle({ type, title }: SimpleTableElementTitleProps) {
    return (
        <div className="simple_table_element simple_table_element-title">
            <p className="heading-m">{title}</p>
        </div>
    );
}

type SimpleTableElementBodyProps = {
    type: "body";
    body: string;
};

function SimpleTableElementBody({ type, body }: SimpleTableElementBodyProps) {
    return (
        <div className="simple_table_element simple_table_element-body">
            <p className="body">{body}</p>
        </div>
    );
}

type SimpleTableElementButtonProps = {
    type: "button";
    button: ButtonSettingProps;
};

function SimpleTableElementButton({ type, button }: SimpleTableElementButtonProps) {
    return (
        <div className="simple_table_element simple_table_element-btn">
            <Button className="" btnSettings={button} colorScheme="gold" variant="outline" />
        </div>
    );
}

type SimpleTableElementHTMLProps = {
    type: "html";
    html: string;
};

function SimpleTableElementHTML({ type, html }: SimpleTableElementHTMLProps) {
    return (
        // <div className="simple_table_element">
            <div className="simple_table_element simple_table_element-html" dangerouslySetInnerHTML={{ __html: html }}></div>
        // </div>
    );
}


// #endregion --------------------------------------------------