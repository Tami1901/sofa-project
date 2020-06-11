import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { IUserLogin } from "../reducers/actions";
import { AppStoreState } from "../lib/reducer";
import { IUserRegister } from "../reducers/actionsRegister";

// Override types with our thunk setup so typescript doesn't use the default and complain
const useThunkDispatch = (): AppDispatch => {
  const dispatch = useDispatch();
  return dispatch;
};

export type AppDispatch = ThunkDispatch<AppStoreState, any, IUserLogin | IUserRegister>;

export default useThunkDispatch;
