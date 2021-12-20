import {
    createSlice,
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit'
import {RootState} from "./store";
import {Selector} from "react-redux";

interface IItem {
    id: number,
    companyName: string,
    address: string,
    ogrn: string,
    inn: string,
    regDate: string
}

interface CompanySliceInitState {
    items: Array<IItem>
    counter: number,
    checked: Array<number>,
    currentPage: number,
    totalPages: number
    itemsPerPage: number
}

export const companySlice = createSlice({
    name: "companySlice",
    initialState: {
        items: [],
        counter: 0,
        checked: [],
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 5
    } as CompanySliceInitState,

    reducers: {


        setPage: (state, action) => {
            state.currentPage = ((action.payload > 0 && action.payload <= state.totalPages) ? action.payload : state.currentPage)
        },
        previousPage: (state) => {
            if (state.currentPage > 1) state.currentPage--
        },
        nextPage: (state) => {
            if (state.currentPage < state.totalPages) state.currentPage++
        },
        updateAddrById: (state, action) => {
            state.items.map(item => {
                if (item.id === action.payload.id) item.address = action.payload.address
            })
        },
        addNewData: (state, action) => {
            state.items.push({
                id: state.counter,
                ...action.payload
            })
            state.counter = state.counter + 1
            let total = Math.ceil(state.items.length / state.itemsPerPage)
            state.totalPages = total === 0 ? 1 : total;
        },
        removeEntry: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
            state.checked = state.checked.filter((item) => item !== action.payload)

            let total = Math.ceil(state.items.length / state.itemsPerPage)
            state.totalPages = total === 0 ? 1 : total;
            if(state.totalPages < state.currentPage) state.currentPage = state.totalPages
        },
        // addChecked: (state, action) => {
        //     state.checked.push(action.payload)
        // },
        switcher: (state, action) => {

            if (state.checked.includes(action.payload)) {
                state.checked = state.checked.filter((item) => item !== action.payload)
            } else state.checked.push(action.payload)
        },
        allSwitcher: (state) => {
            if (state.checked.length === state.items.length) {
                state.checked = []
            } else {
                state.checked = state.items.map((item) => item.id)
            }
        },
        // checkAll: (state, action) => {
        //     state.checked.push(...state.items.map((item) => item.id))
        // },
        // uncheckAll: (state, action) => {
        //     state.checked = []
        // },
        // removeChecked: (state, action) => {
        //     state.checked = state.checked.filter((item) => item !== action.payload)
        // },
        deleteChecked: (state) => {
            state.items = state.items.filter((item) => !state.checked.includes(item.id))
            state.checked = []

            let total = Math.ceil(state.items.length / state.itemsPerPage)
            state.totalPages = total === 0 ? 1 : total;
            if(state.totalPages < state.currentPage) state.currentPage = state.totalPages
        }
    },
})


export const selectItems = (state: RootState) => state.companyReducer.items
export const selectCurrentPage = (state: RootState) => state.companyReducer.currentPage
export const selectTotalPages = (state: RootState) => state.companyReducer.totalPages
export const selectAmountOfItemsPerPage = (state: RootState) => state.companyReducer.itemsPerPage
export const selectChecked = (state: RootState) => state.companyReducer.checked
export const selectIfAllChecked = (state: RootState) =>
    (state.companyReducer.items.length !== 0) && (state.companyReducer.items.length === state.companyReducer.checked.length)
export const selectIfAnyChecked = (state: RootState) => state.companyReducer.checked.length !== 0

// wtf
export const selectByCurrentPage = createSelector(
    [selectItems, selectCurrentPage, selectTotalPages, selectAmountOfItemsPerPage],
    (items:IItem[], currentPage:number, totalPages:number, itemsPerPage:number) => {
        let start = (currentPage * itemsPerPage) - (itemsPerPage - 1)-1;
        let end = Math.min(start + itemsPerPage, items.length);
        return items.slice(start, end);
    }


)

export const {
    addNewData,
    setPage,
    previousPage,
    nextPage,
    // addChecked,
    // removeChecked,
    // checkAll,
    // uncheckAll,
    updateAddrById,
    deleteChecked,
    switcher,
    allSwitcher,
    removeEntry
} = companySlice.actions

export default companySlice.reducer