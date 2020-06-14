import * as t from "./types";

const initState: t.UserStore = { loading: false, loggedIn: false, init: false };

const reducer = (state = initState, action: t.IUserLogin): t.UserStore => {
  switch (action.type) {
    case t.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: undefined,
        username: action.payload.username,
        init: false
      };
    case t.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        token: action.payload.token,
        user: action.payload.user,
        username: action.payload.user.username
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
        loading: true,
        error: undefined,
        init: true
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
