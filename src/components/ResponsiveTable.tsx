import React from "react";
import {useMediaQuery} from "react-responsive";
import Table from "./Table/Table";
import MobileList from "./MobileList/MobileList";
import {useDispatch, useSelector} from "react-redux";
import {
    selectByCurrentPage,
    selectCurrentPage,
    selectTotalPages,
    setPage,
    nextPage,
    previousPage
} from "../store/companySlice";
import {Paginate} from "./Paginate";

export interface DataItemProps {
    id: number,
    companyName: string,
    address: string,
    ogrn: string,
    inn: string,
    regDate: string
}

export interface DataProps {
    items: DataItemProps[]
}

const ResponsiveTable = () => {
    const dispatch = useDispatch()
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 800px)'})
    const dataItems = useSelector(selectByCurrentPage)
    const currentPage = useSelector(selectCurrentPage)
    const totalPages = useSelector(selectTotalPages)

    const toNext = () => {
        dispatch(nextPage())
    }

    const toPrevious = () => {
        dispatch(previousPage())
    }

    const toArbitrary = (n : number) => {
        dispatch(setPage(n))
    }

    const handleNewPage = (selectedItem: { selected: number; }) => {
        dispatch(setPage(selectedItem.selected+1))
    }
    // @ts-ignore
    return (
        <>
            {dataItems.length === 0 && <div className="mb-10 flex justify-center flex-row justify-center">
                <div className="text-3xl text-emerald-500 leading-tight h-3 mt-3 ml-1">“</div>
                <p className="font-mono tracking-tighter text-xl text-gray-600 text-center px-2">Самое время для чего-то
                    нового</p>
                <div className="text-3xl text-emerald-500 leading-tight h-3 -mt-3 mr-1">”</div>
            </div>}
            {dataItems.length !== 0 && !isTabletOrMobile && <Table items={dataItems}/>}
            {dataItems.length !== 0 && isTabletOrMobile && <MobileList items={dataItems}/>}
            <Paginate
                currentPage={currentPage}
                onArbitrary={toArbitrary}
                onNext={toNext}
                onPrevious={toPrevious}
                totalPages={totalPages}/>
        </>

    )
}
export default ResponsiveTable;