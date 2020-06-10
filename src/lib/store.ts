import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
// import { createLogger } from "redux-logger";

import rootReducer from "./reducer";

const composeEnhancers = composeWithDevTools({});
const middleware = [thunkMiddleware];

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

export default store;
