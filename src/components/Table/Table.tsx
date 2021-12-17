import React, {useState} from "react";
import {useMediaQuery} from "react-responsive";
import {DataProps} from "../ResponsiveTable";
import TableItem from "./TableItem";

const Table = (props: DataProps) => {

    const tableData = props.items.map((value,number ) => {
        return <TableItem key = {number} data={value}/>
    })

    console.log(tableData);
    return(
        <div className="flex-col m-auto">
                <div className="py-2 inline-block">
                        <table className="">
                            <thead className="border-b">
                            <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    #
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Наименование
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Адрес
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    ОГРН
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    ИНН
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Дата регистрации
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-left">

                                </th>
                            </tr>
                            </thead>
                            <tbody>
                                {tableData}
                            </tbody>
                        </table>
                </div>
        </div>
    )
}

export default Table;