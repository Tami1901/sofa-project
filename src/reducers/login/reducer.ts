import * as t from "./types";

const initState: t.UserStore = { loading: false, loggedIn: false };

const reducer = (state = initState, action: t.IUserLogin): t.UserStore => {
  switch (action.type) {
    case t.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: undefined,
        username: action.payload.username
      };
    case t.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        token: action.payload.token
      };
    case t.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        error: action.payload.error
      };
    case t.LOGIN_INIT:
      return {
        ...state,
        error: undefined,
        token: action.payload.token,
        loggedIn: action.payload.isLoggedIn
      };
    case t.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        token: undefined
      };
    default:
      return state;
  }
};

export { reducer };
