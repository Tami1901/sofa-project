import { ActionCreator } from "redux";
import { NewLeagueData } from "../../pages/leagues/LeaguesNew";

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

interface EventUpdateData {
  score?: string;
  name?: string;
  a?: string;
  b?: string;
}

type IUpdateEvent = ActionCreator<t.ThunkResult<Promise<boolean>>>;
const updateEvent: IUpdateEvent = (
  token: string,
  leagueId: string,
  eventId: string,
  data: EventUpdateData
) => async (dispatch): Promise<boolean> => {
  dispatch(a.UpdateEventLoading(eventId));

  try {
    const { res } = await api.patch(
      `/leagues/${leagueId}/events/${eventId}`,
      data as any,
      false,
      token,
      true
    );

    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error);
    }

    const { res: res2, json } = await api.get<t.IEvent>(
      `/leagues/${leagueId}/events/${eventId}`,
      true,
      token,
      true
    );
    if (!res2.ok) {
      throw new Error((json as any).error);
    }

    dispatch(a.UpdateEventSuccess(leagueId, eventId, json));

    return true;
  } catch (err) {
    dispatch(a.UpdateEventError(eventId, err.message));
  }

  return false;
};

type IUpdateLeague = ActionCreator<t.ThunkResult<Promise<boolean>>>;
const updateLeague: IUpdateLeague = (
  token: string,
  id: string,
  data: Record<string, string>
) => async (dispatch): Promise<boolean> => {
  dispatch(a.LeagueUpdateLoading(id));

  try {
    const { res } = await api.patch(`/leagues/${id}`, data, false, token, true);

    if (!res.ok) {
      const json = await res.json();
      throw new Error((json as any).error);
    }

    const { res: res2, json } = await api.get<t.League>(`/leagues/${id}`, true, token, true);
    if (!res2.ok) {
      throw new Error((json as any).error);
    }

    dispatch(a.LeagueUpdateSuccess(json, id));
    return true;
  } catch (err) {
    dispatch(a.LeagueUpdateFail(id, err.message));
    return false;
  }
};

type IDeleteLeague = ActionCreator<t.ThunkResult<Promise<boolean>>>;
const deleteLeague: IDeleteLeague = (token: string, id: string) => async (
  dispatch
): Promise<boolean> => {
  dispatch(a.LeagueDeleteLoading(id));

  try {
    const { res } = await api.remove(`/leagues/${id}`, false, token, true);

    if (!res.ok) {
      const json = await res.json();
      throw new Error((json as any).error);
    }

    dispatch(a.LeagueDeleteSuccess(id));
    return true;
  } catch (err) {
    dispatch(a.LeagueDeleteFail(id, err.message));
    return false;
  }
};

type IDeleteEvent = ActionCreator<t.ThunkResult<Promise<boolean>>>;
const deleteEvent: IDeleteEvent = (token: string, id: string, eventId: string) => async (
  dispatch
): Promise<boolean> => {
  dispatch(a.DeleteEventLoading(eventId));

  try {
    const { res } = await api.remove(`/leagues/${id}/events/${eventId}`, false, token, true);

    if (!res.ok) {
      const json = await res.json();
      throw new Error((json as any).error);
    }

    dispatch(a.DeleteEventSuccess(eventId, id));
    return true;
  } catch (err) {
    dispatch(a.DeleteEventError(id, err.message));
    return false;
  }
};

export {
  fetchLeagues,
  createLeague,
  fetchLeague,
  createEvent,
  updateEvent,
  updateLeague,
  deleteLeague,
  deleteEvent
};
