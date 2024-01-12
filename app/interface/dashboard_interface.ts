import { UserDummyResponseType } from "./response_interface";

export enum ActionDashboardTypes {
  SET_LOADING = "SET_LOADING",
  SET_COUNT = "SET_COUNT",
  SET_DATA = "SET_DATA",
}

export interface SetLoadingAction {
  type: ActionDashboardTypes.SET_LOADING;
  loading: boolean;
}

export interface SetCountAction {
  type: ActionDashboardTypes.SET_COUNT;
  count: number;
}

export interface SetDataAction {
  type: ActionDashboardTypes.SET_DATA;
  data: UserDummyResponseType[];
}

export type ActionDashboard = SetLoadingAction | SetCountAction | SetDataAction;

export interface StateDashboard {
  loading: boolean;
  count: number;
  data: UserDummyResponseType[];
}
