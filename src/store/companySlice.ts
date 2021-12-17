import {
    createSlice
} from '@reduxjs/toolkit'
import {RootState} from "./store";

interface CompanySliceInitState{
    items:Array<{
        companyName: string,
        address: string,
        ogrn: string,
        inn: string,
        regDate: string
    }>
}

export const companySlice = createSlice({
    name: "companySlice",
    initialState: {
        items: []
    } as CompanySliceInitState,

    reducers: {
        addNewData: (state, action) => {
            state.items.push(action.payload)
        }
    }
})

export const selectItems = (state: RootState) => state.companyReducer.items


export const {
    addNewData
} = companySlice.actions

export default companySlice.reducer