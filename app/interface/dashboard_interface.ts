import { ActionTypes } from "./interface_store";
import { UserDummyResponseType } from "./response_interface";

export interface SetDasboardLoadingAction {
  type: ActionTypes.SET_LOADING;
  loading: boolean;
}

export interface SetDasboardCountAction {
  type: ActionTypes.SET_COUNT;
  count: number;
}

export interface SetDashboardDataAction {
  type: ActionTypes.SET_DATA;
  data: UserDummyResponseType[];
}

export type ActionDashboard =
  | SetDasboardLoadingAction
  | SetDasboardCountAction
  | SetDashboardDataAction;

export interface StateDashboard {
  loading: boolean;
  count: number;
  data: UserDummyResponseType[];
}
