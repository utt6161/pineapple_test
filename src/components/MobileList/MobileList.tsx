import React from "react";
import {DataProps} from "../ResponsiveTable";
import MobileListItem from "./MobileListItem";
import {useSelector} from "react-redux";
import {selectCurrentPage} from "../../store/companySlice";

const MobileList = (props: DataProps) => {
    const currentPage = useSelector(selectCurrentPage)
    const mobileTableData = props.items.map((value,number ) => {
        return <MobileListItem key = {(currentPage * 10) + number} data={value}/>
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