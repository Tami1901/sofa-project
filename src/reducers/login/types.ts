import { ThunkAction } from "redux-thunk";
import { AppStoreState } from "../../lib/reducer";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_INIT = "LOGIN_INIT";

export interface UserStore {
  loading: boolean;
  username?: string;
  token?: string;
  error?: string;
  loggedIn: boolean;
}

export interface IUserLoginStart {
  type: typeof LOGIN_START;
  payload: {
    username: string;
  };
}

export interface IUserLoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: {
    token: string;
  };
}

export interface IUserLoginFail {
  type: typeof LOGIN_FAIL;
  payload: {
    error: string;
  };
}

export interface IUserLoginInit {
  type: typeof LOGIN_INIT;
  payload: {
    token: string | null;
    isLoggedIn: boolean;
  };
}

export type IUserLogin = IUserLoginStart | IUserLoginSuccess | IUserLoginFail | IUserLoginInit;
export type ThunkResult<R> = ThunkAction<R, AppStoreState, null, IUserLogin>;
