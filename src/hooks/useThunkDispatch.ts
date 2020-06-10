import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { IUserLogin } from "../reducers/actions";
import { AppStoreState } from "../lib/reducer";

// Override types with our thunk setup so typescript doesn't use the default and complain
const useThunkDispatch = (): AppDispatch => {
  const dispatch = useDispatch();
  return dispatch;
};

export type AppDispatch = ThunkDispatch<AppStoreState, any, IUserLogin>;

export default useThunkDispatch;