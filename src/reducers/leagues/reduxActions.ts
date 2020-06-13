import * as t from "./types";

export const LeaguesLoading = (): t.ILeaguesLoading => {
  return {
    type: t.LEAGUES_LOADING
  };
};

export const LeaguesSuccess = (leagues: t.League[]): t.ILeaguesSuccess => {
  return {
    type: t.LEAGUES_SUCCESS,
    payload: {
      leagues
    }
  };
};

export const LeaguesFail = (error: string): t.ILeaguesFail => {
  return {
    type: t.LEAGUES_FAIL,
    payload: {
      error
    }
  };
};

export const AddLeaguesLoading = (): t.ILeagueAddLoading => {
  return {
    type: t.ADD_LEAGUE_LOADING
  };
};

export const AddLeaguesSuccess = (league: t.League): t.ILeagueAddSuccess => {
  return {
    type: t.ADD_LEAGUE_SUCCESS,
    payload: {
      league
    }
  };
};

export const AddLeaguesFail = (error: string): t.ILeagueAddFail => {
  return {
    type: t.ADD_LEAGUE_FAIL,
    payload: {
      error
    }
  };
};

export const LeagueLoading = (): t.ILeagueLoading => {
  return {
    type: t.LEAGUE_LOADING
  };
};

export const LeagueSuccess = (league: t.League): t.ILeagueSuccess => {
  return {
    type: t.LEAGUE_SUCCESS,
    payload: {
      league
    }
  };
};

export const LeagueFail = (error: string): t.ILeagueFail => {
  return {
    type: t.LEAGUE_FAIL,
    payload: {
      error
    }
  };
};

export const AddEventLoading = (): t.IEventAddLoading => {
  return {
    type: t.ADD_EVENT_LOADING
  };
};

export const AddEventSuccess = (leagueId: string, event: t.IEvent): t.IEventAddSuccess => {
  return {
    type: t.ADD_EVENT_SUCCESS,
    payload: {
      leagueId,
      event
    }
  };
};

export const AddEventFail = (error: string): t.IEventAddFail => {
  return {
    type: t.ADD_EVENT_FAIL,
    payload: {
      error
    }
  };
};
