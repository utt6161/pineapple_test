import React, {useState} from "react";
import {removeEntry, selectChecked, switcher} from "../../store/companySlice"
import {useDispatch, useSelector} from "react-redux";


export interface TableDataItemProps {
    data: {
        id: number,
        companyName: string,
        address: string,
        ogrn: string,
        inn: string,
        regDate: string
    }
}

function TableItem(props: TableDataItemProps) {
    const dispatch = useDispatch();
    const checkedItems = useSelector(selectChecked)
    const checked = checkedItems.includes(props.data.id)
    console.log(checkedItems)
    return (
        <>
            <tr className={checked ? " border-red-400 border-x-4" : "border-b"}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {props.data.id}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {props.data.companyName}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {props.data.address}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {props.data.ogrn}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {props.data.inn}
                </td>
                <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                    {props.data.regDate}
                </td>
                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap flex justify-between">
                    <div className="form-check">
                        <div className="form-check">
                            <input
                                className="form-check-input appearance-none mt-3 h-8 w-8 border border-emerald-300 rounded-sm bg-white checked:border-red-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                                type="checkbox" value={props.data.id}
                                onChange={() => {
                                    dispatch(switcher(props.data.id))
                                }}
                                checked={checked}>

                                {checked && <svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none"
                                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                 strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path
                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    <line x1="10" y1="11" x2="10" y2="17"/>
                                    <line x1="14" y1="11" x2="14" y2="17"/>
                                </svg>}

                            </input>
                        </div>
                    </div>

                    <button type="button" onClick={() => dispatch(removeEntry(props.data.id))}
                            className="p-3">
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