import React, {Dispatch} from "react";

interface PaginateProps {
    totalPages: number,
    currentPage: number
    toDisplay: number,
    onNext: Dispatch<number>,
    onPrevious: Dispatch<number>,
    onArbitrary: Dispatch<number>
}

export const Paginate = ({totalPages, currentPage, toDisplay, onNext, onPrevious, onArbitrary}:PaginateProps) => {
    if(totalPages > 2) {

    }


    return (
        <>
            {totalPages!==1 &&
            <div className="flex flex-row justify-center">
                <div>
                    {"<"}
                </div>
                <div>
                    {">"}
                </div>
            </div>

            }
        </>

    )
}