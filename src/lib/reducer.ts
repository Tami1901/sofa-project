import { combineReducers } from "redux";
import { reducer as login } from "../reducers/actions";
import { reducer as leagues } from "../reducers/actionsLeagues";

const rootReducer = combineReducers({ login, leagues });

export default rootReducer;
export type AppStoreState = ReturnType<typeof rootReducer>;
