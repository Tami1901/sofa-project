import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppStoreState } from "../lib/reducer";

const LEAGUES_LOADING = "LEAGUES_LOADING";
const LEAGUES_SUCCESS = "LEAGUES_SUCCESS";
const LEAGUES_FAIL = "LEAGUES_FAIL";

interface League {
  id: string;
  name: string;
  admins: string[];
  users: any;
  createdAtTimestamp: number;
  updatedAtTimestamp: number;
}

interface LeaguesStore {
  loading: boolean;
  error: string;
  leagues: League[];
}

interface ILeagueLoading {
  type: typeof LEAGUES_LOADING;
}

interface ILeagueSuccess {
  type: typeof LEAGUES_SUCCESS;
  payload: {
    leagues: League[];
  };
}

interface ILeagueFail {
  type: typeof LEAGUES_FAIL;
  payload: {
    error: string;
  };
}

type ILeagueAction = ILeagueLoading | ILeagueSuccess | ILeagueFail;
type ThunkResult<R> = ThunkAction<R, AppStoreState, null, ILeagueAction>;
const initStore: LeaguesStore = { loading: false, error: "", leagues: [] };

const reducer = (store = initStore, action: ILeagueAction): LeaguesStore => {
  switch (action.type) {
    case LEAGUES_LOADING:
      return { ...store, loading: true, error: "" };
    case LEAGUES_SUCCESS:
      return { ...store, loading: false, leagues: action.payload.leagues };
    case LEAGUES_FAIL:
      return { ...store, loading: false, error: action.payload.error };
    default:
      return store;
  }
};

const LeaguesLoading = (): ILeagueLoading => {
  return {
    type: LEAGUES_LOADING
  };
};

const LeaguesSuccess = (leagues: League[]): ILeagueSuccess => {
  return {
    type: LEAGUES_SUCCESS,
    payload: {
      leagues
    }
  };
};

const LeaguesFail = (error: string): ILeagueFail => {
  return {
    type: LEAGUES_FAIL,
    payload: {
      error
    }
  };
};

type IFetchLeagues = ActionCreator<ThunkResult<Promise<void>>>;
const fetchLeagues: IFetchLeagues = (token: string) => async (dispatch): Promise<void> => {
  dispatch(LeaguesLoading());

  try {
    const res = await fetch(`https://private-leagues-api.herokuapp.com/api/leagues`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-App-Key": "tamara"
      }
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    const leagues: League[] = data as League[];
    dispatch(LeaguesSuccess(leagues));
  } catch (err) {
    dispatch(LeaguesFail(err.message));
  }
};

export { reducer, fetchLeagues };
