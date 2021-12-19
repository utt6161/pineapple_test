import {combineReducers, configureStore} from '@reduxjs/toolkit'
import companyReducer from "./companySlice";

const rootReducer = combineReducers({
    companyReducer: companyReducer
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // might need later
            },
        }),
}
)

export type RootState = ReturnType<typeof store.getState>
export type dispatchType = typeof store.dispatch