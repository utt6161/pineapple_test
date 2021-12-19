import React, {Dispatch} from "react";

interface PaginateProps {
    totalPages: number,
    currentPage: number,
    onNext: Dispatch<void>,
    onPrevious: Dispatch<void>,
    onArbitrary: Dispatch<number>
}
const toGoClasses = "bg-emerald-400 text-white h-8 w-10 mx-1 rounded-sm hover:bg-emerald-600"
const toGoDisabled = "bg-emerald-200 text-white h-8 w-10 mx-1 rounded-sm"
const counterClasses = "text-gray-500 min-w-8 min-h-8 mx-1 px-1 rounded-sm border-x-2 border-emerald-400"
const labelInsideClasses = "select-none flex justify-center items-center w-full h-full m-auto font-mono font-light tracking-tighter text-2xl"

export const Paginate = ({totalPages, currentPage, onNext, onPrevious, onArbitrary}:PaginateProps) => {

    return (
        <>
            {totalPages > 1 &&
            <div className="flex flex-row justify-center w-full py-4">
                <div
                    className = {currentPage === 1 ? toGoDisabled : toGoClasses}
                    onClick={()=>onArbitrary(1)}>
                    <span className = {labelInsideClasses}>{"<<"}</span>
                </div>
                <div
                    className = {currentPage === 1 ? toGoDisabled : toGoClasses}
                    onClick={()=>onPrevious()}>
                    <span className = {labelInsideClasses}>{"<"}</span>
                </div>
                <div className = {counterClasses} >
                    <span className = {labelInsideClasses}>{currentPage + ":" + totalPages}</span>
                </div>
                <div
                    className = {currentPage === totalPages ? toGoDisabled : toGoClasses}
                    onClick={()=>onNext()}>
                    <span className = {labelInsideClasses}>{">"}</span>
                </div>
                <div
                    className = {currentPage === totalPages ? toGoDisabled : toGoClasses}
                    onClick={()=>onArbitrary(totalPages)}>
                    <span className = {labelInsideClasses}>{">>"}</span>
                </div>
            </div>

            }
        </>

    )
}