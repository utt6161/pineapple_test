import React from "react";
import {useMediaQuery} from "react-responsive";
import Table from "./Table/Table";
import MobileList from "./MobileList/MobileList";
import {data} from "autoprefixer";
import {useSelector} from "react-redux";
import {selectItems} from "../store/companySlice";

export interface DataItemProps {
    id: number,
    companyName: string,
    address: string,
    ogrn: string,
    inn: string,
    regDate: string
}

export interface DataProps {
    items: DataItemProps[]
}

const ResponsiveTable = () => {

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})
    // const dataItems = new Array<DataItemProps>({
    //     data: {
    //         companyName: "string",
    //         address: "string",
    //         ogrn: "string",
    //         inn: "string",
    //         regDate: new Date().toDateString()
    //     }
    // }, {
    //     data: {
    //         companyName: "string1",
    //         address: "string1",
    //         ogrn: "string1",
    //         inn: "string1",
    //         regDate: new Date().toDateString()
    //     }
    // })
    const dataItems = useSelector(selectItems)
    console.log(dataItems)
    console.log(dataItems.length)
    return (
        <>
            {/*{ isDesktopOrLaptop && <Table items={}/> }*/}
            {dataItems.length == 0 && <div className="w-full mb-10">
                <div className="text-3xl text-emerald-500 text-left leading-tight h-3">“</div>
                    <p className="font-mono tracking-tighter text-xl text-gray-600 text-center px-4">Самое время для чего-то нового</p>
                <div className="text-3xl text-emerald-500 text-right leading-tight h-3 -mt-3">”</div>
                {/*<div className="w-full">*/}
                {/*    <p className="font-mono tracking-tighter text-md text-emerald-500 font-bold text-right">Unknown</p>*/}
                {/*</div>*/}
            </div>}
            {dataItems.length != 0 && <Table items={dataItems}/>}
            {/*{ isTabletOrMobile && <MobileList items={}/>}*/}
        </>

    )
}
export default ResponsiveTable;