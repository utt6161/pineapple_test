import React from "react";
import {DataProps} from "../ResponsiveTable";
import TableItem from "../Table/TableItem";
import MobileListItem from "./MobileListItem";

const MobileList = (props: DataProps) => {
    const mobileTableData = props.items.map((value,number ) => {
        return <MobileListItem key = {number} data={value}/>
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