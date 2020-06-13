import * as t from "./types";

export const LoginStart = (username: string): t.IUserLoginStart => {
  return {
    type: t.LOGIN_START,
    payload: {
      username
    }
  };
};

export const LoginSuccess = (token: string): t.IUserLoginSuccess => {
  return {
    type: t.LOGIN_SUCCESS,
    payload: {
      token
    }
  };
};

export const LoginFail = (error: string): t.IUserLoginFail => {
  return {
    type: t.LOGIN_FAIL,
    payload: {
      error
    }
  };
};

export const LoginInit = (): t.IUserLoginInit => {
  const token = localStorage.getItem("token");

  // TODO: Check if token is correct

  return { type: t.LOGIN_INIT, payload: { token, isLoggedIn: !!token } };
};
