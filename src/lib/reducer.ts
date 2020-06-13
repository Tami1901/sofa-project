import { combineReducers } from "redux";
import { reducer as login } from "../reducers/login";
import { reducer as leagues } from "../reducers/leagues";

const rootReducer = combineReducers({ login, leagues });

export default rootReducer;
export type AppStoreState = ReturnType<typeof rootReducer>;
