import React, {Dispatch, useState} from "react";
import {removeEntry, selectChecked, switcher} from "../../store/companySlice"
import {useDispatch, useSelector} from "react-redux";
import {InlineEditField} from "../InlineEditField";
import useLongPress from "../MobileList/longPressHook";


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
    const longPress = useLongPress(()=>{
        dispatch(switcher(props.data.id))
    }, 500)
    return (
        <>
            <tr {...longPress} className={("border-b" + (checked ? " bg-red-100" : ""))}>
                <td className="text-sm text-gray-900 font-light xl:px-6 px-2 py-4">
                    <label>
                        <div
                            className={"flex appearance-none h-8 w-8 rounded-sm focus:outline-none " +
                                "transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain " +
                                "float-left cursor-pointer"}
                            onClick={() => {
                                dispatch(switcher(props.data.id))
                            }}
                            >
                            <svg className={(checked ? "text-red-500" : "text-emerald-500") + " h-8 w-8 m-auto cursor-pointer " +
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
                </td>
                <td className="text-sm text-gray-900 font-light xl:px-6 px-2 py-4 ">
                    {props.data.id+1}
                </td>
                <td className="text-sm text-gray-900 font-light xl:px-6 px-2 py-4 ">
                    {props.data.companyName}
                </td>
                <td className="text-sm text-gray-900 font-light xl:px-6 px-2 py-4 ">
                    <InlineEditField maxlength = {150} value={props.data.address} id={props.data.id}/>
                </td>
                <td className="text-sm text-gray-900 font-light xl:px-6 px-2 py-4 ">
                    {props.data.ogrn}
                </td>
                <td className="text-sm text-gray-900 font-light xl:px-6 px-2 py-4 ">
                    {props.data.inn}
                </td>
                <td className="text-sm text-gray-900 font-light xl:px-6 px-2 py-4 ">
                    {props.data.regDate}
                </td>
                <td className="text-sm text-gray-900 font-light lg:px-6 px-2 py-4 ">

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