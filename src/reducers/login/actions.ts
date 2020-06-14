import { ActionCreator } from "redux";
import * as t from "./types";
import * as a from "./reduxActions";

const loginAction: ActionCreator<t.ThunkResult<Promise<boolean>>> = (
  username: string,
  password: string,
  keep: boolean
) => async (dispatch): Promise<boolean> => {
  dispatch(a.LoginStart(username));

  try {
    const res = await fetch(`https://private-leagues-api.herokuapp.com/api/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    let resData = await res.json();

    if (res.ok) {
      resData = resData as {
        token: string;
        user: {
          user: { username: string; extra1: string; extra2: string; extra: string; id: string };
        };
      };
      const { token, user } = resData;
      if (keep) {
        localStorage.setItem("token", token);
      }
      dispatch(a.LoginSuccess(token, user));
      return true;
    }

    throw new Error(resData.error);
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

    const res = await fetch(`https://private-leagues-api.herokuapp.com/api/check-token`, {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      const resData = await res.json();
      localStorage.removeItem("token");
      throw new Error(resData.error);
    }

    const res2 = await fetch(`https://private-leagues-api.herokuapp.com/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    let resData2 = await res2.json();

    if (!res2.ok) {
      throw new Error(resData2.error);
    }

    resData2 = resData2 as {
      username: string;
      id: string;
      [key: string]: string;
    };

    dispatch(a.LoginSuccess(token, resData2));
    return true;
  } catch (err) {
    dispatch(a.LoginFail(err.message));
  }
};

export { loginAction, loginInit };
