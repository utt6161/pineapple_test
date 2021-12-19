import React from "react";
import {useMediaQuery} from "react-responsive";
import Table from "./Table/Table";
import MobileList from "./MobileList/MobileList";
import {data} from "autoprefixer";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAmountOfItemsPerPage,
    selectByCurrentPage,
    selectCurrentPage,
    selectItems,
    selectTotalPages,
    setPage,
    nextPage,
    previousPage
} from "../store/companySlice";
import ReactPaginate from "react-paginate";
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
        console.log(selectedItem.selected+1)
        dispatch(setPage(selectedItem.selected+1))
    }
    const pageClassNames = "text-gray-500 " +
        "w-8 h-8 mx-1 rounded-sm border-x-2 border-emerald-400"
    const pageLinkClassNames = "select-none flex justify-center items-center w-full h-full m-auto font-mono font-light tracking-tighter text-2xl"
    const directionClassNames = "bg-emerald-400 text-white h-8 w-10 mx-1 rounded-sm hover:bg-emerald-600"
    const directionLinkClassNames = "select-none flex justify-center items-center w-full h-full font-mono font-light tracking-tighter text-2xl"
    const disabledClassNames = "bg-emerald-200 text-white h-8 w-10 mx-1 rounded-sm"

    // @ts-ignore
    return (
        <>
            {/*{ isDesktopOrLaptop && <Table items={}/> }*/}
            {dataItems.length === 0 && <div className="mb-10 flex justify-center flex-row justify-center">
                <div className="text-3xl text-emerald-500 leading-tight h-3 mt-3 ml-1">“</div>
                <p className="font-mono tracking-tighter text-xl text-gray-600 text-center px-2">Самое время для чего-то
                    нового</p>
                <div className="text-3xl text-emerald-500 leading-tight h-3 -mt-3 mr-1">”</div>
                {/*<div className="w-full">*/}
                {/*    <p className="font-mono tracking-tighter text-md text-emerald-500 font-bold text-right">Unknown</p>*/}
                {/*</div>*/}
            </div>}
            {dataItems.length !== 0 && !isTabletOrMobile && <Table items={dataItems}/>}
            {dataItems.length !== 0 && isTabletOrMobile && <MobileList items={dataItems}/>}
            {/*<Pagination*/}
            {/*    onChange={handleNewPage}*/}
            {/*    current={currentPage}*/}
            {/*    total={totalPages}*/}
            {/*    showLessItems*/}
            {/*    style={{ marginBottom: '2rem' }}*/}
            {/*    {...iconsProps}*/}
            {/*/>*/}
            {/*    {totalPages > 1 && <ReactPaginate*/}
            {/*        containerClassName={"flex flex-row justify-center w-full py-4"}*/}
            
            {/*        nextLinkClassName={directionLinkClassNames}*/}
            {/*        nextClassName={directionClassNames}*/}
            {/*        //*/}
            {/*        // breakLinkClassName={pages}*/}
            {/*        // breakClassName={pagesDiv}*/}
            
            {/*        disabledClassName={disabledClassNames}*/}
            
            {/*        pageLinkClassName={pageLinkClassNames}*/}
            {/*        pageClassName={pageClassNames}*/}
            
            {/*        previousLinkClassName={directionLinkClassNames}*/}
            {/*        previousClassName={directionClassNames}*/}
            
            {/*        // activeLinkClassName={activeLinkClassNames}*/}
            {/*        // activeClassName={directionClassNames}*/}
            {/*        forcePage={currentPage-1}*/}
            {/*        breakLabel=".."*/}
            {/*        nextLabel=">"*/}
            {/*        marginPagesDisplayed={0}*/}
            {/*        pageRangeDisplayed={0}*/}
            {/*        onPageChange={handleNewPage}*/}
            {/*        pageCount={totalPages}*/}
            {/*        previousLabel="<"*/}
            {/*        // @ts-ignore*/}
            {/*        renderOnZeroPageCount={null}*/}
            {/*    />}*/}
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