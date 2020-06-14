import { ThunkAction } from "redux-thunk";
import { AppStoreState } from "../../lib/reducer";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_INIT = "LOGIN_INIT";
export const LOGOUT = "LOGOUT";

export const REGISTER_LOADING = "REGISTER_LOADING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export interface User {
  id: string;
  username: string;
  [key: string]: string;
}

export interface UserStore {
  loading: boolean;
  init: boolean;
  username?: string;
  token?: string;
  error?: string;
  loggedIn: boolean;
  user?: User;
  register: {
    loading: boolean;
    error: string;
  };
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
    user: User;
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
}

export interface IUserRegisterLoading {
  type: typeof REGISTER_LOADING;
}

export interface IUserRegisterSuccess {
  type: typeof REGISTER_SUCCESS;
}

export interface IUserRegisterFail {
  type: typeof REGISTER_FAIL;
  payload: {
    error: string;
  };
}

export interface IUserLogout {
  type: typeof LOGOUT;
}

export type IUserLogin =
  | IUserLoginStart
  | IUserLoginSuccess
  | IUserLoginFail
  | IUserLoginInit
  | IUserLogout
  | IUserRegisterLoading
  | IUserRegisterSuccess
  | IUserRegisterFail;
export type ThunkResult<R> = ThunkAction<R, AppStoreState, null, IUserLogin>;
