import { combineReducers } from "redux";
import routerStateReducer, { RouterState } from "./routerStateReducer";
import sprintReducer, { ISprintState } from "./sprintReducer";
import userReducer, { UserState } from "./userReducer";
import workspaceReducer, { IWorkspaceState } from "./workspaceReducer";

export interface RootState {
  userReducer: UserState;
  routerState: RouterState;
  workspaceReducer: IWorkspaceState;
  sprintReducer: ISprintState;
}

const rootReducer = combineReducers({
  userReducer,
  routerState: routerStateReducer,
  workspaceReducer,
  sprintReducer,
});

export default rootReducer;
