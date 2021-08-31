import { ActionType } from "./actionTypes";

export interface ISprint {
  status: string[];
  tasks: ITask[];
  sprintName: string;
  startDate: Date;
  endDate: Date;
  workspaceId: string;
  goals: string[];
  _id?: string;
}

export interface ITask {
  _id?: string;
  taskName: string;
  currentStatus: string;
  dueDate: Date;
  assignedMember: string[];
  subtasks: string[];
}

interface ISprintAction {
  type: ActionType.SEND_CURRENT_SPRINT | ActionType.CREATED_SPRINT;
  payload: ISprint;
}

interface ITaskAction {
  type: ActionType.ADDED_TASK;
  payload: ITask[];
}

interface IAddStatusAction {
  type: ActionType.UPDATE_STATUS;
  payload: string[];
}

interface ISprintEmpty {
  type: ActionType.SET_EMPTY_SPRINT;
}

export type IAction =
  | ISprintAction
  | ITaskAction
  | IAddStatusAction
  | ISprintEmpty;
