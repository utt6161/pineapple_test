import {combineReducers, configureStore, applyMiddleware} from '@reduxjs/toolkit'
import companyReducer from "./companySlice";
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    companyReducer: companyReducer
})
const composeEnhancers = composeWithDevTools({})
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