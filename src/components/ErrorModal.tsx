import React from "react";
import {Dialog} from "@headlessui/react";

interface ErrorModalProps{
    error: string,
    closeModal: () => void,
    status: boolean
}

const ErrorModal = (props: ErrorModalProps) => {
    return(
        <Dialog open={props.status} onClose={() => props.closeModal()}
                className="absolute
                        top-1/2
                        left-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        min-h-2/5
                        sm:w-2/6
                        w-full
                        bg-white
                        rounded-md
                        shadow-lg p-4">
            <Dialog.Overlay />
            <div className = "flex justify-between" >
                <h1 className="pt-3">Ошибка</h1>
                <button type="button" onClick={() => props.closeModal()}
                        className="p-3">
                    <svg className="h-8 w-8 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                </button>
            </div>

            <Dialog.Description className = "text-center">
                {props.error}
            </Dialog.Description>
        </Dialog>
    )
}

export default ErrorModal;