import { ActionCreator } from "redux";
import * as t from "./types";
import * as a from "./reduxActions";

import * as api from "../../services/http";

interface LoginActionResponse {
  token: string;
  user: t.User;
}

const loginAction: ActionCreator<t.ThunkResult<Promise<boolean>>> = (
  username: string,
  password: string,
  keep: boolean
) => async (dispatch): Promise<boolean> => {
  dispatch(a.LoginStart(username));

  try {
    const { res, json } = await api.post<LoginActionResponse>(
      `/login`,
      { username, password },
      true
    );

    if (res.ok) {
      const { token, user } = json;
      if (keep) {
        localStorage.setItem("token", token);
      }
      dispatch(a.LoginSuccess(token, user));
      return true;
    }

    throw new Error((json as any).error);
  } catch (err) {
    dispatch(a.LoginFail(err.message));
    return false;
  }
};

const loginInit: ActionCreator<t.ThunkResult<Promise<boolean>>> = () => async (
  dispatch
): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    dispatch(a.LoginInit());

    const { res } = await api.post(`/check-token`, { token }, false);

    if (!res.ok) {
      const resData = await res.json();
      localStorage.removeItem("token");
      throw new Error(resData.error);
    }

    const { res: res2, json } = await api.get<t.User>("/users/me", true, token);

    if (!res2.ok) {
      throw new Error((json as any).error);
    }

    dispatch(a.LoginSuccess(token, json));
    return true;
  } catch (err) {
    dispatch(a.LoginFail(err.message));
  }
};

const registerUser: ActionCreator<t.ThunkResult<Promise<boolean>>> = (data) => async (
  dispatch
): Promise<boolean> => {
  dispatch(a.RegisterLoading());

  try {
    const { res, json } = await api.post<{ id: string }>(`/register`, data, true);

    if (!res.ok) {
      throw new Error((json as any).error);
    }

    await dispatch(loginAction(data.username, data.password, true));
    dispatch(a.RegisterSuccess());

    return true;
  } catch (error) {
    dispatch(a.RegisterFail(error.message));
  }

  return false;
};

const updateUser: ActionCreator<t.ThunkResult<Promise<boolean>>> = (token: string, data) => async (
  dispatch
): Promise<boolean> => {
  dispatch(a.UpdateLoading());

  try {
    const { res } = await api.patch(`/users/me`, data, false, token);

    if (!res.ok) {
      const json = await res.json();
      throw new Error((json as any).error);
    }

    const { res: res2, json } = await api.get<t.User>("/users/me", true, token);

    if (!res2.ok) {
      throw new Error((json as any).error);
    }

    dispatch(a.UpdateSuccess(json));
    return true;
  } catch (error) {
    dispatch(a.UpdateFail(error.message));
  }

  return false;
};

export { loginAction, loginInit, registerUser, updateUser };
