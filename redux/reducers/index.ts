import { combineReducers } from "redux";
import routerStateReducer, { RouterState } from "./routerStateReducer";
import userReducer, { UserState } from "./userReducer";

export interface RootState {
  userReducer: UserState;
  routerState: RouterState;
}

const rootReducer = combineReducers({
  userReducer,
  routerState: routerStateReducer,
});

export default rootReducer;
