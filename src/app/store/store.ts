import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/RootReducer";
import { thunk } from "redux-thunk";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})