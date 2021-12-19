import React from "react";
import {DataProps} from "../ResponsiveTable";
import TableItem from "../Table/TableItem";
import MobileListItem from "./MobileListItem";
import {nanoid} from "@reduxjs/toolkit";

const MobileList = (props: DataProps) => {
    const mobileTableData = props.items.map((value,number ) => {
        return <MobileListItem key = {nanoid()} data={value}/>
    })
    return (


        <>
        <div className="w-full">
            <div className = "flex flex-col">
                {mobileTableData}
            </div>
        </div>
        </>

    )
}

export default MobileList;