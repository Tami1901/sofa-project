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

export const UPDATE_LOADING = "UPDATE_LOADING";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_FAIL = "UPDATE_FAIL";

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
  update: {
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

export interface IUserUpdateLoading {
  type: typeof UPDATE_LOADING;
}

export interface IUserUpdateSuccess {
  type: typeof UPDATE_SUCCESS;
  payload: {
    user: User;
  };
}

export interface IUserUpdateFail {
  type: typeof UPDATE_FAIL;
  payload: {
    error: string;
  };
}

export type IUserLogin =
  | IUserLoginStart
  | IUserLoginSuccess
  | IUserLoginFail
  | IUserLoginInit
  | IUserLogout
  | IUserRegisterLoading
  | IUserRegisterSuccess
  | IUserRegisterFail
  | IUserUpdateLoading
  | IUserUpdateSuccess
  | IUserUpdateFail;
export type ThunkResult<R> = ThunkAction<R, AppStoreState, null, IUserLogin>;
