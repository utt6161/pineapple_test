import React, {Dispatch, useState} from "react";
import {removeEntry, selectChecked, switcher} from "../../store/companySlice"
import {useDispatch, useSelector} from "react-redux";
import {InlineEditField} from "../InlineEditField";


export interface TableDataItemProps {
    data: {
        id: number,
        companyName: string,
        address: string,
        ogrn: string,
        inn: string,
        regDate: string
    },
}

function TableItem(props: TableDataItemProps) {
    const dispatch = useDispatch();
    const checkedItems = useSelector(selectChecked)
    const checked = checkedItems.includes(props.data.id)

    return (
        <>
            <tr className={("border-b" + (checked ? " bg-red-100" : ""))}>
                <td className="text-sm text-gray-900 font-light xl:px-6 px-2 py-4 whitespace-nowrap relative">
                    <label>
                        <input
                            className="form-check-input appearance-none h-8 w-8 border border-emerald-300 rounded-sm bg-white checked:border-red-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                            type="checkbox" value={props.data.id}
                            onChange={() => {
                                dispatch(switcher(props.data.id))
                            }}
                            checked={checked}>
                        </input>
                        {checked && <div className="absolute top-1/2
                        left-1/2
                        -translate-x-1/2
                        -translate-y-1/2">

                            <svg className="h-8 w-8 text-red-500 cursor-pointer" width="24" height="24"
                                 viewBox="0 0 24 24"
                                 strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <line x1="12" y1="5" x2="12" y2="19"/>
                                <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                        </div>}
                    </label>
                </td>
                <td className="text-sm text-gray-900 font-light xl:px-6 px-2 py-4 whitespace-nowrap">
                    {props.data.id}
                </td>
                <td className="text-sm text-gray-900 font-light xl:px-6 px-2 py-4 whitespace-nowrap">
                    {props.data.companyName}
                </td>
                <td className="text-sm text-gray-900 font-light xl:px-6 px-2 py-4 max-w-full whitespace-nowrap">
                    <InlineEditField value={props.data.address} id={props.data.id}/>
                </td>
                <td className="text-sm text-gray-900 font-light xl:px-6 px-2 py-4 whitespace-nowrap">
                    {props.data.ogrn}
                </td>
                <td className="text-sm text-gray-900 font-light xl:px-6 px-2 py-4 whitespace-nowrap">
                    {props.data.inn}
                </td>
                <td className="text-sm text-gray-900 font-light xl:px-6 px-2 py-4 whitespace-nowrap">
                    {props.data.regDate}
                </td>
                <td className="text-sm text-gray-900 font-light lg:px-6 px-2 py-4 whitespace-nowrap">

                    <button type="button" onClick={() => dispatch(removeEntry(props.data.id))}
                            className="p-3 m-auto">
                        <svg className="h-8 w-8 text-red-500 transition duration-300 ease-out
                        hover:text-red-800 hover:stroke-2" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <line x1="9" y1="9" x2="15" y2="15"/>
                            <line x1="15" y1="9" x2="9" y2="15"/>
                        </svg>
                    </button>

                </td>
            </tr>
        </>
    )
}

export default TableItem;