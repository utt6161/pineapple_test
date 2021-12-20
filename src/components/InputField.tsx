import React, {FormEventHandler, useState} from "react";
import uniqueId from "lodash.uniqueid"

export enum inputType{
    num = "num",
    text = "text",
    date = "date"
}

interface InputFieldProps {
    title: string,
    hint?: string,
    pattern?: string,
    onInvalid?: string,
    type?: inputType,
    value: any,
    onChange: (arg:string)=>void
}

const InputField  = ({title, hint, pattern, type, value, onChange, onInvalid}: InputFieldProps) => {
    const [ id ] = useState(uniqueId('id-'))
    const handleOnInvalid = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onInvalid != null) {
            e.target.setCustomValidity(onInvalid)
        }
    }
    const handleOnValid = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.setCustomValidity("")
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
        e.target.setCustomValidity("")
    }
    return (
        <div className="form-group mb-6 w-full">
            <label htmlFor={id} className="form-label inline-block mb-2 text-gray-700">{title}</label>
            <input value = {value}
                   onChange={(value)=>handleOnChange(value)}
                   required type={type} pattern = {pattern}
                   onInvalid = {handleOnInvalid}
                   className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-emerald-600 focus:outline-none" id={id}
                   placeholder={hint}/>
        </div>
)
}

export default InputField;