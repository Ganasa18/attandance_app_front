import { ActionTypes, UserDatabaseResponseType } from ".";

export interface SetDatabaseUserLoadingAction {
  type: ActionTypes.SET_LOADING;
  loading: boolean;
}

export interface SetDatabaseUserCountAction {
  type: ActionTypes.SET_COUNT;
  count: number;
}

export interface SetDatabaseUserDataAction {
  type: ActionTypes.SET_DATA;
  data: UserDatabaseResponseType[];
}

export type SetActionDatabaseUser =
  | SetDatabaseUserLoadingAction
  | SetDatabaseUserCountAction
  | SetDatabaseUserDataAction;

export interface StateDatabaseUser {
  loading: boolean;
  count: number;
  data: UserDatabaseResponseType[];
}
