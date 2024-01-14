import { ActionTypes } from "./interface_store";
import { MenuResponseType } from "./response_interface";

export interface SetMenuLoadingAction {
  type: ActionTypes.SET_LOADING;
  loading: boolean;
}

export interface SetMenuCountAction {
  type: ActionTypes.SET_COUNT;
  count: number;
}

export interface SetMenuDataAction {
  type: ActionTypes.SET_DATA;
  data: MenuResponseType[];
}

export type SetActionMenuMaster =
  | SetMenuLoadingAction
  | SetMenuCountAction
  | SetMenuDataAction;

export interface StateMenuMaster {
  loading: boolean;
  count: number;
  data: MenuResponseType[];
}
