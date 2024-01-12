/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Action {
  type: ActionTypes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export type SetActionGlobal = ActionPayloadGlobal;

export interface SetGlobalLoadingAction {
  type: ActionTypes.SET_LOADING;
  action: boolean;
}

export interface SetGlobalNavMenuAction {
  type: ActionTypes.SET_NAV_MENU;
  action: boolean;
}

export interface SetGlobalNavIndexAction {
  type: ActionTypes.SET_NAV_INDEX;
  action: number | null;
}

export interface SetGlobalUserTokenAction {
  type: ActionTypes.SET_USER_TOKEN;
  action: string;
}

export type ActionPayloadGlobal =
  | SetGlobalLoadingAction
  | SetGlobalNavMenuAction
  | SetGlobalNavIndexAction
  | SetGlobalUserTokenAction;

export interface GlobalStateInterface {
  isLoading: boolean;
  userLogin: object;
  activeNav: boolean;
  activeIndexNav: number | null;
  token: string | null;
}

export interface TableStateInterface {
  selectedValue: any[];
  rowPerPage: number;
  pageTable: number;
}

export type ActionPayloadTable =
  | {
      type: ActionTypes.SET_SELECTED_ROW_TABLE;
      action: any[];
    }
  | {
      type: ActionTypes.SET_TABLE_ROW_PER_PAGE;
      action: number;
    }
  | {
      type: ActionTypes.SET_TABLE_PAGE;
      action: number;
    };

export enum ActionTypes {
  SET_LOADING = "SET_LOADING",
  SET_NAV_MENU = "SET_NAV_MENU",
  SET_NAV_INDEX = "SET_NAV_INDEX",
  SET_SELECTED_ROW_TABLE = "SET_SELECTED_ROW_TABLE",
  SET_TABLE_ROW_PER_PAGE = "SET_TABLE_ROW_PER_PAGE",
  SET_TABLE_PAGE = "SET_TABLE_PAGE",
  SET_COUNT = "SET_COUNT",
  SET_DATA = "SET_DATA",
  SET_USER_TOKEN = "SET_USER_TOKEN",
}

export enum TypeStoreStorage {
  LOCAL_USER_MENU = "LOCAL_USER_MENU",
  USER_TOKEN = "USER_TOKEN",
}
