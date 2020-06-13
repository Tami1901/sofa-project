import * as t from "./types";

const initStore: t.LeaguesStore = {
  loading: false,
  error: "",
  leagues: [],
  add: { loading: false, error: "" },
  addEvent: { loading: false, error: "" }
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
    default:
      return store;
  }
};
