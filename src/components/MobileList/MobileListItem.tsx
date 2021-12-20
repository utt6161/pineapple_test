import React from "react";
import {useDispatch} from "react-redux";
import {removeEntry, switcher} from "../../store/companySlice";
import {Accordion} from "./Accordion"
import {InlineEditField} from "../InlineEditField";

export interface MobileDataItemProps {
    data: {
        id: number,
        companyName: string,
        address: string,
        ogrn: string,
        inn: string,
        regDate: string
    },
}

const MobileListItem = (props: MobileDataItemProps) => {

    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(switcher(props.data.id))
    }
    return (
        <div>
            <Accordion id = {props.data.id} title={
                <div className="flex h-full w-full">
                    <button type="button" onClick={() => dispatch(removeEntry(props.data.id))}
                                        className="px-2 m-auto">
                        <svg className="h-8 w-8 text-red-500 transition duration-300 ease-out
                        hover:text-red-800 hover:stroke-2" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <line x1="9" y1="9" x2="15" y2="15"/>
                            <line x1="15" y1="9" x2="9" y2="15"/>
                        </svg>
                    </button>
                    <div className = "text-lg text-gray-900 font-light px-2 flex flex-row w-full"  onClick = {onClick} >
                        <span className = "m-auto">{props.data.companyName}</span>
                    </div>
                </div>
            }>
                <table className="w-full text-center">
                    <tbody>
                    <tr className="border border-t border-gray-300 text-md text-gray-900 font-light px-2 py-4">
                        <td className="text-md text-gray-900 font-light xl:px-6 px-2 py-4"><span>Адрес: </span></td>
                        <td className="text-md text-gray-900 font-light xl:px-6 px-2 py-4">
                            <InlineEditField maxlength = {200} value={props.data.address} id={props.data.id}/>
                        </td>
                    </tr>
                    <tr className="border border-t border-gray-300 text-md text-gray-900 font-light px-2 py-4">
                        <td className="text-md text-gray-900 font-light xl:px-6 px-2 py-4 "><span>ОГРН: </span></td>
                        <td className="text-md text-gray-900 font-light xl:px-6 px-2 py-4 "><span>{props.data.ogrn}</span></td>
                    </tr>
                    <tr className="border border-t border-gray-300 text-md text-gray-900 font-light px-2 py-4">
                        <td className="text-md text-gray-900 font-light xl:px-6 px-2 py-4 "><span>ИНН: </span></td>
                        <td className="text-md text-gray-900 font-light xl:px-6 px-2 py-4 "><span>{props.data.inn}</span></td>
                    </tr>
                    <tr className="border border-t border-gray-300 text-md text-gray-900 font-light px-2 py-4">
                        <td className="text-md text-gray-900 font-light xl:px-6 px-2 py-4 "><span>Дата регистрации: </span></td>
                        <td className="text-md text-gray-900 font-light xl:px-6 px-2 py-4 "><span>{props.data.regDate}</span></td>
                    </tr>
                    </tbody>
                </table>

            </Accordion>

        </div>
    )
}
export default MobileListItem;