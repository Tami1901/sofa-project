import { ThunkAction } from "redux-thunk";
import { ActionCreator } from "redux";
import { AppStoreState } from "../lib/reducer";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

interface UserStore {
  loading: boolean;
  username?: string;
  token?: string;
  error?: string;
  loggedIn: boolean;
}

interface IUserLoginStart {
  type: typeof LOGIN_START;
  payload: {
    username: string;
  };
}

interface IUserLoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: {
    token: string;
  };
}

interface IUserLoginFail {
  type: typeof LOGIN_FAIL;
  payload: {
    error: string;
  };
}

export type IUserLogin = IUserLoginStart | IUserLoginSuccess | IUserLoginFail;
type ThunkResult<R> = ThunkAction<R, AppStoreState, null, IUserLogin>;

const initState: UserStore = { loading: false, loggedIn: false };

const reducer = (state = initState, action: IUserLogin): UserStore => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        error: undefined,
        username: action.payload.username
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        token: action.payload.token
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

const LoginStart = (username: string): IUserLoginStart => {
  return {
    type: LOGIN_START,
    payload: {
      username
    }
  };
};

const LoginSuccess = (token: string): IUserLoginSuccess => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token
    }
  };
};

const LoginFail = (error: string): IUserLoginFail => {
  return {
    type: LOGIN_FAIL,
    payload: {
      error
    }
  };
};

const loginAction: ActionCreator<ThunkResult<Promise<boolean>>> = (
  username: string,
  password: string
) => async (dispatch): Promise<boolean> => {
  dispatch(LoginStart(username));

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
        user: {
          token: string;
          user: { username: string; extra1: string; extra2: string; extra: string; id: string };
        };
      };
      dispatch(LoginSuccess(resData.user.token));
      return true;
    }

    throw new Error(resData.error);
  } catch (err) {
    dispatch(LoginFail(err.message));
    return false;
  }
};

export { reducer, loginAction };
