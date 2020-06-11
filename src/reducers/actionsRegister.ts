import { ThunkAction } from "redux-thunk";
import { ActionCreator } from "redux";
import { AppStoreState } from "../lib/reducer";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

interface UserStore {
  loading: boolean;
  username?: string;
  token?: string;
  error?: string;
  loggedIn: boolean;
}

interface IUserRegisterStart {
  type: typeof REGISTER_START;
  payload: {
    username: string;
  };
}

interface IUserRegisterSuccess {
  type: typeof REGISTER_SUCCESS;
  payload: {
    token: string;
  };
}

interface IUserRegisterFail {
  type: typeof REGISTER_FAIL;
  payload: {
    error: string;
  };
}

export type IUserRegister = IUserRegisterStart | IUserRegisterSuccess | IUserRegisterFail;
type ThunkResult<R> = ThunkAction<R, AppStoreState, null, IUserRegister>;

const initState: UserStore = { loading: false, loggedIn: false };

const reducer = (state = initState, action: IUserRegister): UserStore => {
  switch (action.type) {
    case REGISTER_START:
      return {
        ...state,
        loading: true,
        error: undefined,
        username: action.payload.username
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        token: action.payload.token
      };
    case REGISTER_FAIL:
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

const RegisterStart = (username: string): IUserRegisterStart => {
  return {
    type: REGISTER_START,
    payload: {
      username
    }
  };
};

const RegisterSuccess = (token: string): IUserRegisterSuccess => {
  return {
    type: REGISTER_SUCCESS,
    payload: {
      token
    }
  };
};

const RegisterFail = (error: string): IUserRegisterFail => {
  return {
    type: REGISTER_FAIL,
    payload: {
      error
    }
  };
};

const registerAction: ActionCreator<ThunkResult<Promise<boolean>>> = (
  username: string,
  password: string
) => async (dispatch): Promise<boolean> => {
  dispatch(RegisterStart(username));

  try {
    const res = await fetch(`https://private-leagues-api.herokuapp.com/api/register`, {
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
      dispatch(RegisterSuccess(resData.user.token));
      return true;
    }

    throw new Error(resData.error);
  } catch (err) {
    dispatch(RegisterFail(err.message));
    return false;
  }
};

export { reducer, registerAction };
