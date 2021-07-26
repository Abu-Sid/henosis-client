import { combineReducers } from "redux";
import userReducer, { UserState } from "./userReducer";

export interface RootState {
  userReducer: UserState;
}

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
