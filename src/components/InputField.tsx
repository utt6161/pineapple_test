import React, {useState} from "react";
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
    type?: inputType,
    value: any,
    onChange: (arg:string)=>void
}

const InputField  = ({title, hint, pattern, type, value, onChange}: InputFieldProps) => {
    const [ id ] = useState(uniqueId('id-'))

    return (
        <div className="form-group mb-6">
            <label htmlFor={id} className="form-label inline-block mb-2 text-gray-700">{title}</label>
            <input value = {value} onChange={(value)=>onChange(value.target.value)} required type={type} pattern = {pattern} className="form-control block
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