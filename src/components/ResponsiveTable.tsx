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
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 800px)'})
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
    return (
        <>
            {/*{ isDesktopOrLaptop && <Table items={}/> }*/}
            {dataItems.length === 0 && <div className="mb-10 flex justify-center flex-row justify-center">
                <div className="text-3xl text-emerald-500 leading-tight h-3 mt-3 ml-1">“</div>
                    <p className="font-mono tracking-tighter text-xl text-gray-600 text-center px-2">Самое время для чего-то нового</p>
                <div className="text-3xl text-emerald-500 leading-tight h-3 -mt-3 mr-1">”</div>
                {/*<div className="w-full">*/}
                {/*    <p className="font-mono tracking-tighter text-md text-emerald-500 font-bold text-right">Unknown</p>*/}
                {/*</div>*/}
            </div>}
            {dataItems.length !== 0 && !isTabletOrMobile && <Table items={dataItems}/>}
            {dataItems.length !== 0 && isTabletOrMobile && <MobileList items={dataItems}/>}
            {/*{ isTabletOrMobile && <MobileList items={}/>}*/}
        </>

    )
}
export default ResponsiveTable;