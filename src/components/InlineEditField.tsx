import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectItems, updateAddrById} from "../store/companySlice"
import TextareaAutosize from "react-textarea-autosize"
interface InlineEditFieldProps {
    maxlength: number,
    value: string,
    id: number
}

export const InlineEditField = (props: InlineEditFieldProps) => {
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" || e.key === "Escape") {
            setEditMode(!editMode);
        }
    }

    const handleOnBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setEditMode(!editMode);
    }
    const items = useSelector(selectItems)

    return (
        <>
            {!editMode && <span
                onClick={() => setEditMode(!editMode)}
                className="block hover:border-y hover:border-emerald-400 hover:rounded-sm max-w-5/6">
                {props.value.length !== 0 ? props.value : "Нет данных"}
            </span>}
            {editMode && <TextareaAutosize
                value={items[items.findIndex(item => item.id === props.id)].address}
                onChange={(e) => {
                        dispatch(updateAddrById({address: e.target.value, id: props.id}))
                    }
                }
                // rows={4} cols={12}
                maxRows={5}
                onKeyDown={handleKeyDown}
                onBlur={handleOnBlur}
                maxLength = {props.maxlength}
                autoFocus
                style={{resize: "none"}}
                className="block w-full p-0 max-w-5/6 text-sm
                    font-light text-base font-normal text-gray-700 bg-white
                    border border-solid border-gray-300 rounded transition
                    ease-in-out m-0 focus:text-gray-700 focus:bg-white
                    focus:border-emerald-600 focus:outline-none"
            />}
        </>
    )
}