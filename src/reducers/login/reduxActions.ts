import * as t from "./types";

export const LoginStart = (username: string): t.IUserLoginStart => {
  return {
    type: t.LOGIN_START,
    payload: {
      username
    }
  };
};

export const LoginSuccess = (token: string, user: t.User): t.IUserLoginSuccess => {
  return {
    type: t.LOGIN_SUCCESS,
    payload: {
      token,
      user
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

export const LogoutAction = (): t.IUserLogout => {
  return {
    type: t.LOGOUT
  };
};

export const LoginInit = (): t.IUserLoginInit => {
  return {
    type: t.LOGIN_INIT
  };
};
