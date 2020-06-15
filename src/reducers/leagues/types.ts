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

export const UPDATE_LEAGUE_LOADING = "UPDATE_LEAGUE_LOADING";
export const UPDATE_LEAGUE_SUCCESS = "UPDATE_LEAGUE_SUCCESS";
export const UPDATE_LEAGUE_FAIL = "UPDATE_LEAGUE_FAIL";

export const DELETE_LEAGUE_LOADING = "DELETE_LEAGUE_LOADING";
export const DELETE_LEAGUE_SUCCESS = "DELETE_LEAGUE_SUCCESS";
export const DELETE_LEAGUE_FAIL = "DELETE_LEAGUE_FAIL";

export const ADD_EVENT_LOADING = "ADD_EVENT_LOADING";
export const ADD_EVENT_SUCCESS = "ADD_EVENT_SUCCESS";
export const ADD_EVENT_FAIL = "ADD_EVENT_FAIL";

export const UPDATE_EVENT_LOADING = "UPDATE_EVENT_LOADING";
export const UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS";
export const UPDATE_EVENT_FAIL = "UPDATE_EVENT_FAIL";

export const DELETE_EVENT_LOADING = "DELETE_EVENT_LOADING";
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS";
export const DELETE_EVENT_FAIL = "DELETE_EVENT_FAIL";

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
  score?: string;
  a: string;
  b: string;
}

interface UpdateMany {
  loading: string[];
  error: Record<string, string>;
}

interface UpdateOne {
  loading: boolean;
  error: string;
}

export interface LeaguesStore {
  loading: boolean;
  error: string;
  leagues: League[];
  update: UpdateMany;
  remove: UpdateMany;
  add: UpdateOne;
  updateEvent: UpdateMany;
  removeEvent: UpdateMany;
  addEvent: UpdateOne;
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

export interface ILeagueUpdateLoading {
  type: typeof UPDATE_LEAGUE_LOADING;
  payload: {
    id: string;
  };
}

export interface ILeagueUpdateSuccess {
  type: typeof UPDATE_LEAGUE_SUCCESS;
  payload: {
    leagueId: string;
    league: League;
  };
}

export interface ILeagueUpdateFail {
  type: typeof UPDATE_LEAGUE_FAIL;
  payload: {
    id: string;
    error: string;
  };
}

export interface ILeagueDeleteLoading {
  type: typeof DELETE_LEAGUE_LOADING;
  payload: {
    id: string;
  };
}

export interface ILeagueDeleteSuccess {
  type: typeof DELETE_LEAGUE_SUCCESS;
  payload: {
    id: string;
  };
}

export interface ILeagueDeleteFail {
  type: typeof DELETE_LEAGUE_FAIL;
  payload: {
    id: string;
    error: string;
  };
}

export interface IUpdateEventLoading {
  type: typeof UPDATE_EVENT_LOADING;
  payload: {
    id: string;
  };
}

export interface IUpdateEventSuccess {
  type: typeof UPDATE_EVENT_SUCCESS;
  payload: {
    leagueId: string;
    id: string;
    data: IEvent;
  };
}

export interface IUpdateEventFail {
  type: typeof UPDATE_EVENT_FAIL;
  payload: {
    id: string;
    error: string;
  };
}

export interface IDeleteEventLoading {
  type: typeof DELETE_EVENT_LOADING;
  payload: {
    id: string;
  };
}

export interface IDeleteEventSuccess {
  type: typeof DELETE_EVENT_SUCCESS;
  payload: {
    leagueId: string;
    id: string;
  };
}

export interface IDeleteEventFail {
  type: typeof DELETE_EVENT_FAIL;
  payload: {
    id: string;
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
  | IEventAddFail
  | IUpdateEventSuccess
  | IUpdateEventLoading
  | IUpdateEventFail
  | ILeagueUpdateLoading
  | ILeagueUpdateSuccess
  | ILeagueUpdateFail
  | ILeagueDeleteLoading
  | ILeagueDeleteSuccess
  | ILeagueDeleteFail
  | IDeleteEventLoading
  | IDeleteEventSuccess
  | IDeleteEventFail;
