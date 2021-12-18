import React, {useState} from "react";
import {useMediaQuery} from "react-responsive";
import {DataProps} from "../ResponsiveTable";
import TableItem from "./TableItem";
import {selectChecked, allSwitcher, selectIfAllChecked, switcher} from "../../store/companySlice";
import {useDispatch, useSelector} from "react-redux";

const Table = (props: DataProps) => {

    const tableData = props.items.map((value,number ) => {
        return <TableItem key = {number} data={value}/>
    })

    const dispatch = useDispatch();
    const allChecked = useSelector(selectIfAllChecked)

    return(
        <div className="flex flex-col">
                <div className="py-2 overflow-x-auto">
                        <table className="table-auto border-collapse w-full">
                            <thead className="border-b">
                            <tr>
                                <th scope="col" className="text-sm text-gray-900 font-light xl:px-6 px-2 py-4 whitespace-nowrap relative">
                                    <label>
                                        <div
                                            className={(allChecked ? "border-x-2 border-red-300" :  "border-x-2 border-emerald-300") + " flex appearance-none h-8 w-8 rounded-sm focus:outline-none " +
                                            "transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain " +
                                            "float-left cursor-pointer"}
                                            onClick={() => {
                                                dispatch(allSwitcher())
                                            }}
                                        >
                                            <svg className={(allChecked ? "text-red-300" : "text-emerald-300") + " h-8 w-8 m-auto cursor-pointer " +
                                            "hover:rotate-45 transition duration-200"} width="24" height="24"
                                                 viewBox="0 0 24 24"
                                                 strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                                 strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"/>
                                                <line x1="12" y1="5" x2="12" y2="19"/>
                                                <line x1="5" y1="12" x2="19" y2="12"/>
                                            </svg>
                                        </div>
                                    </label>
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 xl:px-6 px-2 py-4 text-left">
                                    #
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 xl:px-6 px-2 py-4 text-left">
                                    Наименование
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 xl:px-6 px-2 py-4 text-left">
                                    Адрес
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 xl:px-6 px-2 py-4 text-left">
                                    ОГРН
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 xl:px-6 px-2 py-4 text-left">
                                    ИНН
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 xl:px-6 px-2 py-4 text-left">
                                    Дата регистрации
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 xl:px-6 px-2 py-4 text-left">

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