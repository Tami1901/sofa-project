import { ActionCreator } from "redux";
import { NewLeagueData } from "../../pages/LeaguesNew";

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

    const leagues: t.League[] = data as t.League[];
    dispatch(a.LeaguesSuccess(leagues));
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

    dispatch(a.AddLeaguesSuccess(leagueRes));

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

    dispatch(a.LeagueSuccess(resData));
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
    const res = await fetch(
      `https://private-leagues-api.herokuapp.com/api/leagues/${leagueId}/events`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-App-Key": "tamara"
        }
      }
    );

    const resData = await res.json();

    if (!res.ok) {
      throw new Error(resData.error);
    }

    const { id } = resData as { id: string };

    const newEventRes = await fetch(
      `https://private-leagues-api.herokuapp.com/api/leagues/${leagueId}/events/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-App-Key": "tamara"
        }
      }
    );

    const newEvent = await newEventRes.json();

    if (!newEventRes.ok) {
      throw new Error(newEvent.error);
    }

    dispatch(a.AddEventSuccess(leagueId, newEvent));

    return true;
  } catch (err) {
    dispatch(a.AddEventFail(err.message));
    return false;
  }
};

export { fetchLeagues, createLeague, fetchLeague, createEvent };
