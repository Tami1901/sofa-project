import { combineReducers } from "redux";
import { reducer } from "../reducers/actions";

const rootReducer = combineReducers({ login: reducer });

export default rootReducer;
export type AppStoreState = ReturnType<typeof rootReducer>;
