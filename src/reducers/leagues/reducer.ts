import * as t from "./types";

const initStore: t.LeaguesStore = {
  loading: false,
  error: "",
  leagues: [],
  add: { loading: false, error: "" },
  addEvent: { loading: false, error: "" },
  addScore: { loading: [], error: {} }
};

export const reducer = (store = initStore, action: t.ILeagueAction): t.LeaguesStore => {
  switch (action.type) {
    case t.LEAGUES_LOADING:
      return { ...store, loading: true, error: "" };
    case t.LEAGUES_SUCCESS: {
      const currIds = store.leagues.map((l) => l.id);
      return {
        ...store,
        loading: false,
        leagues: action.payload.leagues.map((l) =>
          currIds.includes(l.id) ? { ...store.leagues.find((la) => la.id === l.id), ...l } : l
        )
      };
    }
    case t.LEAGUES_FAIL:
      return { ...store, loading: false, error: action.payload.error };
    case t.ADD_LEAGUE_LOADING:
      return { ...store, add: { ...store.add, loading: true, error: "" } };
    case t.ADD_LEAGUE_SUCCESS:
      return {
        ...store,
        add: { ...store.add, loading: false },
        leagues: [...store.leagues, action.payload.league]
      };
    case t.ADD_LEAGUE_FAIL:
      return { ...store, add: { ...store.add, loading: false, error: action.payload.error } };
    case t.LEAGUE_LOADING:
      return { ...store, loading: true, error: "" };
    case t.LEAGUE_SUCCESS:
      return {
        ...store,
        loading: false,
        leagues: store.leagues.map((l) => l.id).includes(action.payload.league.id)
          ? store.leagues.map((l) =>
              l.id === action.payload.league.id ? action.payload.league : l
            )
          : [...store.leagues, action.payload.league]
      };
    case t.LEAGUE_FAIL:
      return { ...store, loading: false, error: action.payload.error };
    case t.ADD_EVENT_LOADING:
      return { ...store, addEvent: { loading: true, error: "" } };
    case t.ADD_EVENT_SUCCESS:
      return {
        ...store,
        leagues: store.leagues.map((l) =>
          l.id === action.payload.leagueId
            ? { ...l, events: [...l.events, action.payload.event] }
            : l
        )
      };
    case t.ADD_EVENT_FAIL:
      return { ...store, addEvent: { loading: true, error: action.payload.error } };
    case t.ADD_SCORE_TO_EVENT_LOADING:
      return {
        ...store,
        addScore: {
          loading: [...store.addScore.loading, action.payload.eventId],
          error: { ...store.addScore.error, [action.payload.eventId]: undefined }
        }
      };
    case t.ADD_SCORE_TO_EVENT_SUCCESS:
      return {
        ...store,
        leagues: store.leagues.map((l) =>
          l.id === action.payload.leagueId
            ? {
                ...l,
                events: (l.events || []).map((e) =>
                  e.id === action.payload.eventId ? { ...e, score: action.payload.score } : e
                )
              }
            : l
        ),
        addScore: {
          loading: store.addScore.loading.filter((a) => a !== action.payload.eventId),
          error: { ...store.addScore.error, [action.payload.eventId]: undefined }
        }
      };
    case t.ADD_SCORE_TO_EVENT_FAIL:
      return {
        ...store,
        addScore: {
          loading: store.addScore.loading.filter((a) => a !== action.payload.eventId),
          error: { ...store.addScore.error, [action.payload.eventId]: action.payload.error }
        }
      };
    default:
      return store;
  }
};
