import { IAction, ISprint, ITask } from "./actionInterface";
import { ActionType } from "./actionTypes";

export const sendCurrentSprint = (sprint: ISprint) => {
  return {
    type: ActionType.SEND_CURRENT_SPRINT,
    payload: sprint,
  };
};

export const createdSprint = (sprint: ISprint): IAction => {
  return {
    type: ActionType.CREATED_SPRINT,
    payload: sprint,
  };
};

export const addTask = (tasks: ITask[]): IAction => {
  return {
    type: ActionType.ADDED_TASK,
    payload: tasks,
  };
};

export const updateStatus = (status: string[]): IAction => {
  return {
    type: ActionType.UPDATE_STATUS,
    payload: status,
  };
};

export const setEmptySprint = (): IAction => {
  return {
    type: ActionType.SET_EMPTY_SPRINT,
  };
};
