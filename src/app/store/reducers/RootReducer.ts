import { combineReducers } from "@reduxjs/toolkit";
import listMenuReducer from "./menu/ListMenu";
const rootReducer = combineReducers({ listMenuReducer })
export default rootReducer