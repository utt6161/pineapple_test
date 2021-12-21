import React from "react";
import {DataProps} from "../ResponsiveTable";
import MobileListItem from "./MobileListItem";
import {useSelector} from "react-redux";
import {selectCurrentPage} from "../../store/companySlice";

const MobileList = (props: DataProps) => {
    const currentPage = useSelector(selectCurrentPage)
    const mobileTableData = props.items.map((value,number ) => {
        // adding id to that multiplication seems obsolete, but i dont remember why
        // i did that in a first place, so i wont touch it, just to be sure
        return <MobileListItem key = {(currentPage * 10) + value.id} data={value}/>
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