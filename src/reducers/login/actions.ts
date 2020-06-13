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
      const { token } = resData;
      if (keep) {
        localStorage.setItem("token", token);
      }
      dispatch(a.LoginSuccess(token));
      return true;
    }

    throw new Error(resData.error);
  } catch (err) {
    dispatch(a.LoginFail(err.message));
    return false;
  }
};

export { loginAction };
