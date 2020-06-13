import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppStoreState } from "../lib/reducer";
import { NewLeagueData } from "../pages/LeaguesNew";

const LEAGUES_LOADING = "LEAGUES_LOADING";
const LEAGUES_SUCCESS = "LEAGUES_SUCCESS";
const LEAGUES_FAIL = "LEAGUES_FAIL";

const ADD_LEAGUE_LOADING = "ADD_LEAGUE_LOADING";
const ADD_LEAGUE_SUCCESS = "ADD_LEAGUE_SUCCESS";
const ADD_LEAGUE_FAIL = "ADD_LEAGUE_FAIL";

const LEAGUE_LOADING = "LEAGUE_LOADING";
const LEAGUE_SUCCESS = "LEAGUE_SUCCESS";
const LEAGUE_FAIL = "LEAGUE_FAIL";

interface League {
  id: string;
  name: string;
  admins: string[];
  users: any;
  place: string;
  type?: string;
  createdAtTimestamp: number;
  updatedAtTimestamp: number;
}

interface LeaguesStore {
  loading: boolean;
  error: string;
  leagues: League[];
  add: {
    loading: boolean;
    error: string;
  };
}

interface ILeaguesLoading {
  type: typeof LEAGUES_LOADING;
}

interface ILeaguesSuccess {
  type: typeof LEAGUES_SUCCESS;
  payload: {
    leagues: League[];
  };
}

interface ILeaguesFail {
  type: typeof LEAGUES_FAIL;
  payload: {
    error: string;
  };
}

interface ILeagueAddLoading {
  type: typeof ADD_LEAGUE_LOADING;
}

interface ILeagueAddSuccess {
  type: typeof ADD_LEAGUE_SUCCESS;
  payload: {
    league: League;
  };
}

interface ILeagueAddFail {
  type: typeof ADD_LEAGUE_FAIL;
  payload: {
    error: string;
  };
}

interface ILeagueLoading {
  type: typeof LEAGUE_LOADING;
}

interface ILeagueSuccess {
  type: typeof LEAGUE_SUCCESS;
  payload: {
    league: League;
  };
}

interface ILeagueFail {
  type: typeof LEAGUE_FAIL;
  payload: {
    error: string;
  };
}

export type ILeagueAction =
  | ILeaguesLoading
  | ILeaguesSuccess
  | ILeaguesFail
  | ILeagueLoading
  | ILeagueSuccess
  | ILeagueFail
  | ILeagueAddLoading
  | ILeagueAddSuccess
  | ILeagueAddFail;

type ThunkResult<R> = ThunkAction<R, AppStoreState, null, ILeagueAction>;
const initStore: LeaguesStore = {
  loading: false,
  error: "",
  leagues: [],
  add: { loading: false, error: "" }
};

const reducer = (store = initStore, action: ILeagueAction): LeaguesStore => {
  switch (action.type) {
    case LEAGUES_LOADING:
      return { ...store, loading: true, error: "" };
    case LEAGUES_SUCCESS: {
      const currIds = store.leagues.map((l) => l.id);
      return {
        ...store,
        loading: false,
        leagues: action.payload.leagues.map((l) =>
          currIds.includes(l.id) ? store.leagues.find((la) => la.id === l.id) : l
        )
      };
    }
    case LEAGUES_FAIL:
      return { ...store, loading: false, error: action.payload.error };
    case ADD_LEAGUE_LOADING:
      return { ...store, add: { ...store.add, loading: true, error: "" } };
    case ADD_LEAGUE_SUCCESS:
      return {
        ...store,
        add: { ...store.add, loading: false },
        leagues: [...store.leagues, action.payload.league]
      };
    case ADD_LEAGUE_FAIL:
      return { ...store, add: { ...store.add, loading: false, error: action.payload.error } };
    case LEAGUE_LOADING:
      return { ...store, loading: true, error: "" };
    case LEAGUE_SUCCESS:
      return {
        ...store,
        loading: false,
        leagues: store.leagues.map((l) => l.id).includes(action.payload.league.id)
          ? store.leagues.map((l) =>
              l.id === action.payload.league.id ? action.payload.league : l
            )
          : [...store.leagues, action.payload.league]
      };
    case LEAGUE_FAIL:
      return { ...store, loading: false, error: action.payload.error };
    default:
      return store;
  }
};

const LeaguesLoading = (): ILeaguesLoading => {
  return {
    type: LEAGUES_LOADING
  };
};

const LeaguesSuccess = (leagues: League[]): ILeaguesSuccess => {
  return {
    type: LEAGUES_SUCCESS,
    payload: {
      leagues
    }
  };
};

const LeaguesFail = (error: string): ILeaguesFail => {
  return {
    type: LEAGUES_FAIL,
    payload: {
      error
    }
  };
};

const AddLeaguesLoading = (): ILeagueAddLoading => {
  return {
    type: ADD_LEAGUE_LOADING
  };
};

const AddLeaguesSuccess = (league: League): ILeagueAddSuccess => {
  return {
    type: ADD_LEAGUE_SUCCESS,
    payload: {
      league
    }
  };
};

const AddLeaguesFail = (error: string): ILeagueAddFail => {
  return {
    type: ADD_LEAGUE_FAIL,
    payload: {
      error
    }
  };
};

const LeagueLoading = (): ILeagueLoading => {
  return {
    type: LEAGUE_LOADING
  };
};

const LeagueSuccess = (league: League): ILeagueSuccess => {
  return {
    type: LEAGUE_SUCCESS,
    payload: {
      league
    }
  };
};

const LeagueFail = (error: string): ILeagueFail => {
  return {
    type: LEAGUE_FAIL,
    payload: {
      error
    }
  };
};

type IFetchLeagues = ActionCreator<ThunkResult<Promise<void>>>;
const fetchLeagues: IFetchLeagues = (token: string, loading: boolean) => async (
  dispatch
): Promise<void> => {
  if (loading) {
    dispatch(LeaguesLoading());
  }

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

type ICreate = ActionCreator<ThunkResult<Promise<string>>>;
const createLeague: ICreate = (token: string, data: NewLeagueData) => async (
  dispatch
): Promise<string> => {
  dispatch(AddLeaguesLoading());

  try {
    const res = await fetch(`https://private-leagues-api.herokuapp.com/api/leagues`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-App-Key": "tamara"
      }
    });

    const resData = await res.json();

    if (!res.ok) {
      throw new Error(resData.error);
    }

    const { id } = resData as { id: string };

    const newLeagueRes = await fetch(
      `https://private-leagues-api.herokuapp.com/api/leagues/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-App-Key": "tamara"
        }
      }
    );

    const leagueRes = await newLeagueRes.json();

    if (!newLeagueRes.ok) {
      throw new Error(leagueRes.error);
    }

    dispatch(AddLeaguesSuccess(leagueRes));

    return id;
  } catch (err) {
    dispatch(AddLeaguesFail(err.message));
  }
};

type IGet = ActionCreator<ThunkResult<Promise<void>>>;
const fetchLeague: IGet = (token: string, id: string, exists: boolean) => async (
  dispatch
): Promise<void> => {
  if (!exists) {
    dispatch(LeagueLoading());
  }

  try {
    const res = await fetch(`https://private-leagues-api.herokuapp.com/api/leagues/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-App-Key": "tamara"
      }
    });

    const resData = await res.json();

    if (!res.ok) {
      throw new Error(resData.error);
    }

    dispatch(LeagueSuccess(resData));
  } catch (err) {
    dispatch(LeagueFail(err.message));
  }
};

export { reducer, fetchLeagues, createLeague, fetchLeague };
