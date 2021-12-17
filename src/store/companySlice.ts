import {
    createSlice,
    createEntityAdapter
} from '@reduxjs/toolkit'
import {RootState} from "./store";

interface CompanySliceInitState {
    items: Array<{
        id: number,
        companyName: string,
        address: string,
        ogrn: string,
        inn: string,
        regDate: string
    }>
    counter: number,
    checked: Array<number>
}

export const companySlice = createSlice({
    name: "companySlice",
    initialState: {
        items: [],
        counter: 0,
        checked: [],
    } as CompanySliceInitState,

    reducers: {
        updateAddrById: (state, action) => {
            state.items.map(item => {
                if(item.id === action.payload.id) item.address = action.payload.address
            })
        },
        addNewData: (state, action) => {
            state.items.push({
                id: state.counter,
                ...action.payload
            })
            state.counter = state.counter + 1
        },
        removeEntry: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
        },
        addChecked: (state, action) => {
            state.checked.push(action.payload)
        },
        switcher: (state, action) => {

            if(state.checked.includes(action.payload)){
                state.checked = state.checked.filter((item) => item !== action.payload)
            } else state.checked.push(action.payload)
        },
        allSwitcher: (state) => {
            if(state.checked.length === state.items.length){
                state.checked = []
            } else {
                state.checked = state.items.map( (item)=> item.id)
            }
        },
        checkAll: (state, action) => {
            state.checked.push( ...state.items.map((item)=>item.id) )
        },
        uncheckAll: (state, action) => {
            state.checked = []
        },
        removeChecked: (state, action) => {
            state.checked = state.checked.filter((item) => item !== action.payload)
        },
        deleteChecked: (state) => {
            console.log("delete checked")
            state.items = state.items.filter((item) => !state.checked.includes(item.id))
            state.checked = []
        }
    },
})


export const selectItems = (state: RootState) => state.companyReducer.items
export const selectChecked = (state:RootState) => state.companyReducer.checked
export const selectIfAllChecked = (state: RootState) =>
    (state.companyReducer.items.length !==0) && (state.companyReducer.items.length === state.companyReducer.checked.length)
export const selectIfAnyChecked = (state: RootState) => state.companyReducer.checked.length !== 0

// export const selectChecked = createSelector([checked, (checked: RootState, id: number) => id], ()

//type Return = (state: RootState) => string | undefined;
// const selectOrganizationName = (id: string): Return =>
//     createSelector(
//         [(state: RootState) => organizationSelectors.selectById(state, id)],
//         (organization) => organization?.name
//     );

export const {
    addNewData,
    addChecked,
    removeChecked,
    checkAll,
    uncheckAll,
    updateAddrById,
    deleteChecked,
    switcher,
    allSwitcher,
    removeEntry
} = companySlice.actions

export default companySlice.reducer