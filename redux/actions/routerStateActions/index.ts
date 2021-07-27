import RouterActionType from "./actionTypes";

const addRouterState = (path: string) => {
  return {
    type: RouterActionType.ADD_ROUTER_STATE,
    payload: path,
  };
};

export default addRouterState;
