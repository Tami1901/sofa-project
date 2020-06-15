import * as t from "./types";

const initStore: t.LeaguesStore = {
  loading: false,
  error: "",
  leagues: [],
  add: { loading: false, error: "" },
  update: { loading: [], error: {} },
  remove: { loading: [], error: {} },
  addEvent: { loading: false, error: "" },
  updateEvent: { loading: [], error: {} },
  removeEvent: { loading: [], error: {} }
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
    case t.UPDATE_LEAGUE_LOADING:
      return {
        ...store,
        update: {
          loading: [...store.update.loading, action.payload.id],
          error: { ...store.update.error, [action.payload.id]: undefined }
        }
      };
    case t.UPDATE_LEAGUE_SUCCESS:
      return {
        ...store,
        leagues: store.leagues.map((l) =>
          l.id === action.payload.leagueId ? { ...l, ...action.payload.league } : l
        ),
        update: {
          loading: store.update.loading.filter((a) => a !== action.payload.leagueId),
          error: { ...store.update.error, [action.payload.leagueId]: undefined }
        }
      };
    case t.UPDATE_LEAGUE_FAIL:
      return {
        ...store,
        update: {
          loading: store.update.loading.filter((a) => a !== action.payload.id),
          error: { ...store.update.error, [action.payload.id]: action.payload.error }
        }
      };
    case t.DELETE_LEAGUE_LOADING:
      return {
        ...store,
        remove: {
          loading: [...store.remove.loading, action.payload.id],
          error: { ...store.remove.error, [action.payload.id]: undefined }
        }
      };
    case t.DELETE_LEAGUE_SUCCESS:
      return {
        ...store,
        leagues: store.leagues.filter((l) => l.id !== action.payload.id),
        remove: {
          loading: store.remove.loading.filter((a) => a !== action.payload.id),
          error: { ...store.remove.error, [action.payload.id]: undefined }
        }
      };
    case t.DELETE_LEAGUE_FAIL:
      return {
        ...store,
        remove: {
          loading: store.remove.loading.filter((a) => a !== action.payload.id),
          error: { ...store.remove.error, [action.payload.id]: action.payload.error }
        }
      };
    case t.ADD_EVENT_LOADING:
      return { ...store, addEvent: { loading: true, error: "" } };
    case t.ADD_EVENT_SUCCESS:
      return {
        ...store,
        addEvent: { loading: false, error: "" },
        leagues: store.leagues.map((l) =>
          l.id === action.payload.leagueId
            ? { ...l, events: [...l.events, action.payload.event] }
            : l
        )
      };
    case t.ADD_EVENT_FAIL:
      return { ...store, addEvent: { loading: true, error: action.payload.error } };
    case t.UPDATE_EVENT_LOADING:
      return {
        ...store,
        updateEvent: {
          loading: [...store.updateEvent.loading, action.payload.id],
          error: { ...store.updateEvent.error, [action.payload.id]: undefined }
        }
      };
    case t.UPDATE_EVENT_SUCCESS:
      return {
        ...store,
        leagues: store.leagues.map((l) =>
          l.id === action.payload.leagueId
            ? {
                ...l,
                events: (l.events || []).map((e) =>
                  e.id === action.payload.id ? { ...e, ...action.payload.data } : e
                )
              }
            : l
        ),
        updateEvent: {
          loading: store.updateEvent.loading.filter((a) => a !== action.payload.id),
          error: { ...store.updateEvent.error, [action.payload.id]: undefined }
        }
      };
    case t.UPDATE_EVENT_FAIL:
      return {
        ...store,
        updateEvent: {
          loading: store.updateEvent.loading.filter((a) => a !== action.payload.id),
          error: { ...store.updateEvent.error, [action.payload.id]: action.payload.error }
        }
      };
    case t.DELETE_EVENT_LOADING:
      return {
        ...store,
        removeEvent: {
          loading: [...store.removeEvent.loading, action.payload.id],
          error: { ...store.removeEvent.error, [action.payload.id]: undefined }
        }
      };
    case t.DELETE_EVENT_SUCCESS:
      return {
        ...store,
        leagues: store.leagues.map((l) =>
          l.id === action.payload.leagueId
            ? {
                ...l,
                events: (l.events || []).filter((e) => e.id !== action.payload.id)
              }
            : l
        ),
        updateEvent: {
          loading: store.updateEvent.loading.filter((a) => a !== action.payload.id),
          error: { ...store.updateEvent.error, [action.payload.id]: undefined }
        }
      };
    case t.DELETE_EVENT_FAIL:
      return {
        ...store,
        removeEvent: {
          loading: store.removeEvent.loading.filter((a) => a !== action.payload.id),
          error: { ...store.removeEvent.error, [action.payload.id]: action.payload.error }
        }
      };
    default:
      return store;
  }
};
