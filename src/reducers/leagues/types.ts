import { ThunkAction } from "redux-thunk";
import { AppStoreState } from "../../lib/reducer";

export const LEAGUES_LOADING = "LEAGUES_LOADING";
export const LEAGUES_SUCCESS = "LEAGUES_SUCCESS";
export const LEAGUES_FAIL = "LEAGUES_FAIL";

export const ADD_LEAGUE_LOADING = "ADD_LEAGUE_LOADING";
export const ADD_LEAGUE_SUCCESS = "ADD_LEAGUE_SUCCESS";
export const ADD_LEAGUE_FAIL = "ADD_LEAGUE_FAIL";

export const LEAGUE_LOADING = "LEAGUE_LOADING";
export const LEAGUE_SUCCESS = "LEAGUE_SUCCESS";
export const LEAGUE_FAIL = "LEAGUE_FAIL";

export const ADD_EVENT_LOADING = "ADD_EVENT_LOADING";
export const ADD_EVENT_SUCCESS = "ADD_EVENT_SUCCESS";
export const ADD_EVENT_FAIL = "ADD_EVENT_FAIL";

export interface League {
  id: string;
  name: string;
  admins: string[];
  users: any;
  events?: IEvent[];
  place: string;
  type?: string;
  createdAtTimestamp: number;
  updatedAtTimestamp: number;
}

export interface IEvent {
  id: string;
  name: string;
  score: string;
  a: string;
  b: string;
}

export interface LeaguesStore {
  loading: boolean;
  error: string;
  leagues: League[];
  add: {
    loading: boolean;
    error: string;
  };
  addEvent: {
    loading: boolean;
    error: string;
  };
}

export type ThunkResult<R> = ThunkAction<R, AppStoreState, null, ILeagueAction>;

export interface ILeaguesLoading {
  type: typeof LEAGUES_LOADING;
}

export interface ILeaguesSuccess {
  type: typeof LEAGUES_SUCCESS;
  payload: {
    leagues: League[];
  };
}

export interface ILeaguesFail {
  type: typeof LEAGUES_FAIL;
  payload: {
    error: string;
  };
}

export interface ILeagueAddLoading {
  type: typeof ADD_LEAGUE_LOADING;
}

export interface ILeagueAddSuccess {
  type: typeof ADD_LEAGUE_SUCCESS;
  payload: {
    league: League;
  };
}

export interface ILeagueAddFail {
  type: typeof ADD_LEAGUE_FAIL;
  payload: {
    error: string;
  };
}

export interface ILeagueLoading {
  type: typeof LEAGUE_LOADING;
}

export interface ILeagueSuccess {
  type: typeof LEAGUE_SUCCESS;
  payload: {
    league: League;
  };
}

export interface ILeagueFail {
  type: typeof LEAGUE_FAIL;
  payload: {
    error: string;
  };
}

export interface IEventAddLoading {
  type: typeof ADD_EVENT_LOADING;
}

export interface IEventAddSuccess {
  type: typeof ADD_EVENT_SUCCESS;
  payload: {
    leagueId: string;
    event: IEvent;
  };
}

export interface IEventAddFail {
  type: typeof ADD_EVENT_FAIL;
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
  | ILeagueAddFail
  | IEventAddLoading
  | IEventAddSuccess
  | IEventAddFail;