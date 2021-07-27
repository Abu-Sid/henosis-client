import RouterActionType from "../actions/routerStateActions/actionTypes";

export interface RouterState {
  path: string;
}

const initialState: RouterState = {
  path: "/",
};

interface Action {
  type: RouterActionType.ADD_ROUTER_STATE;
  payload: string;
}

const routerStateReducer = (
  state = initialState,
  { type, payload }: Action
) => {
  switch (type) {
    case RouterActionType.ADD_ROUTER_STATE: {
      return {
        ...state,
        path: payload,
      };
    }
    default:
      return state;
  }
};

export default routerStateReducer;
