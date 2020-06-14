import { ActionCreator } from "redux";
import { NewLeagueData } from "../../pages/LeaguesNew";

import * as api from "../../services/http";

import * as t from "./types";
import * as a from "./reduxActions";

type IFetchLeagues = ActionCreator<t.ThunkResult<Promise<void>>>;
const fetchLeagues: IFetchLeagues = (token: string, loading: boolean) => async (
  dispatch
): Promise<void> => {
  if (loading) {
    dispatch(a.LeaguesLoading());
  }

  try {
    const { res, json } = await api.get<t.League[]>(`/leagues`, true, token, true);
    if (!res.ok) {
      throw new Error((json as any).error);
    }

    dispatch(a.LeaguesSuccess(json));
  } catch (err) {
    dispatch(a.LeaguesFail(err.message));
  }
};

type ICreate = ActionCreator<t.ThunkResult<Promise<string>>>;
const createLeague: ICreate = (token: string, data: NewLeagueData) => async (
  dispatch
): Promise<string> => {
  dispatch(a.AddLeaguesLoading());

  try {
    const { res, json } = await api.post(`/leagues`, data as any, true, token, true);
    if (!res.ok) {
      throw new Error((json as any).error);
    }

    const { id } = json as { id: string };
    const { res: res2, json: json2 } = await api.get<t.League>(`/leagues/${id}`, true, token, true);

    if (!res2.ok) {
      throw new Error((json2 as any).error);
    }

    dispatch(a.AddLeaguesSuccess(json2));

    return id;
  } catch (err) {
    dispatch(a.AddLeaguesFail(err.message));
  }
};

type IGet = ActionCreator<t.ThunkResult<Promise<boolean>>>;
const fetchLeague: IGet = (token: string, id: string, exists: boolean) => async (
  dispatch
): Promise<boolean> => {
  if (!exists) {
    dispatch(a.LeagueLoading());
  }

  try {
    const { res, json } = await api.get<t.League>(`/leagues/${id}`, true, token, true);
    if (!res.ok) {
      throw new Error((json as any).error);
    }

    dispatch(a.LeagueSuccess(json));
    return true;
  } catch (err) {
    dispatch(a.LeagueFail(err.message));
    return false;
  }
};

type ICreateEvent = ActionCreator<t.ThunkResult<Promise<boolean>>>;
const createEvent: ICreateEvent = (
  token: string,
  leagueId: string,
  data: Omit<t.IEvent, "id">
) => async (dispatch): Promise<boolean> => {
  dispatch(a.AddEventLoading());

  try {
    const { res, json } = await api.post(`/leagues/${leagueId}/events`, data, true, token, true);
    if (!res.ok) {
      throw new Error((json as any).error);
    }

    const { id } = json as { id: string };

    const { res: resNew, json: jsonNew } = await api.get<t.IEvent>(
      `/leagues/${leagueId}/events/${id}`,
      true,
      token,
      true
    );

    if (!resNew.ok) {
      throw new Error((jsonNew as any).error);
    }

    dispatch(a.AddEventSuccess(leagueId, jsonNew));

    return true;
  } catch (err) {
    dispatch(a.AddEventFail(err.message));
    return false;
  }
};

type IAddScoreToEvent = ActionCreator<t.ThunkResult<Promise<void>>>;
const addScoreToEvent: IAddScoreToEvent = (
  token: string,
  leagueId: string,
  eventId: string,
  score: string
) => async (dispatch): Promise<void> => {
  dispatch(a.AddScoreToEventLoading(eventId));

  try {
    const { res } = await api.patch(
      `/leagues/${leagueId}/events/${eventId}`,
      { score },
      false,
      token,
      true
    );

    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error);
    }

    dispatch(a.AddScoreToEventSuccess(leagueId, eventId, score));
  } catch (err) {
    dispatch(a.AddScoreToEventError(eventId, err.message));
  }
};

export { fetchLeagues, createLeague, fetchLeague, createEvent, addScoreToEvent };
