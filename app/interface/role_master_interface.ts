import { ActionTypes } from "./interface_store";
import { RoleResponseType } from "./response_interface";

export interface SetRoleLoadingAction {
  type: ActionTypes.SET_LOADING;
  loading: boolean;
}

export interface SetRoleCountAction {
  type: ActionTypes.SET_COUNT;
  count: number;
}

export interface SetRoleDataAction {
  type: ActionTypes.SET_DATA;
  data: RoleResponseType[];
}

export type SetActionRoleMaster =
  | SetRoleLoadingAction
  | SetRoleCountAction
  | SetRoleDataAction;

export interface StateRoleMaster {
  loading: boolean;
  count: number;
  data: RoleResponseType[];
}
