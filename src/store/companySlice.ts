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
        checkAll: (state, action) => {
            state.checked.push( ...state.items.map((item)=>item.id) )
        },
        uncheckAll: (state, action) => {
            state.checked = []
        },
        removeChecked: (state, action) => {
            state.checked = state.checked.filter((item) => item !== action.payload)
        }
    },
})


export const selectItems = (state: RootState) => state.companyReducer.items
export const selectChecked = (state:RootState) => state.companyReducer.checked

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
    switcher,
    removeEntry
} = companySlice.actions

export default companySlice.reducer