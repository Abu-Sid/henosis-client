import { combineReducers } from "redux";
import routerStateReducer, { RouterState } from "./routerStateReducer";
import userReducer, { UserState } from "./userReducer";
import workspaceReducer, { IWorkspaceState } from "./workspaceReducer";

export interface RootState {
  userReducer: UserState;
  routerState: RouterState;
  workspaceReducer: IWorkspaceState;
}

const rootReducer = combineReducers({
  userReducer,
  routerState: routerStateReducer,
  workspaceReducer,
});

export default rootReducer;
