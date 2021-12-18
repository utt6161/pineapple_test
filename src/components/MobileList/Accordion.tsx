import {ReactNode, useState} from "react";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectChecked, switcher} from "../../store/companySlice";
import useLongPress from "./longPressHook";

interface AccordionProps {
    id: number,
    title: ReactNode,
    children?: ReactNode
}

export const Accordion = (props: AccordionProps) => {
    const [isActive, setIsActive] = useState(false);
    const checkedItems = useSelector(selectChecked)
    const checked = checkedItems.includes(props.id)
    const dispatch = useDispatch();
    const longPress = useLongPress(() => {
        dispatch(switcher(props.id))
    }, 500)
    return (
        <div className="box-content border-t border-gray-300">
            <div className="">
                <div {...longPress} className = {(checked ? "bg-red-100" : "") + " flex flex-row justify-between h-10"}>
                    <div>{props.title}</div>
                    <div className="flex w-10 mx-2 border-x-2 border-emerald-400 rounded-sm"
                         onClick={() => setIsActive(!isActive)}>
                        {isActive ?
                            <svg className="m-auto h-8 w-8 text-green-500" width="24" height="24" viewBox="0 0 24 24"
                                 strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <polyline points="7 11 12 6 17 11"/>
                                <polyline points="7 17 12 12 17 17"/>
                            </svg> :
                            <svg className="m-auto h-8 w-8 text-green-500" width="24" height="24" viewBox="0 0 24 24"
                                 strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <polyline points="7 7 12 12 17 7"/>
                                <polyline points="7 13 12 18 17 13"/>
                            </svg>}</div>
                </div>
            </div>
            {isActive && <div className="accordion-content">{props.children}</div>}
        </div>
    );
};