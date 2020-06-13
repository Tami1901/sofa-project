import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppStoreState } from "../lib/reducer";

import { IUserLogin } from "../reducers/login";
import { ILeagueAction } from "../reducers/leagues";

// Override types with our thunk setup so typescript doesn't use the default and complain
const useThunkDispatch = (): AppDispatch => {
  const dispatch = useDispatch();
  return dispatch;
};

export type AppDispatch = ThunkDispatch<AppStoreState, any, IUserLogin | ILeagueAction>;

export default useThunkDispatch;
