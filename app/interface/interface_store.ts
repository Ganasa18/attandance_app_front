/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Action {
  type: ActionTypes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action?: any;
}

// export type SetActionGlobal = ActionPayloadGlobal;

export interface SetGlobalLoadingAction {
  type: ActionTypes.SET_LOADING;
  isLoading: boolean;
}

export interface SetGlobalNavMenuAction {
  type: ActionTypes.SET_NAV_MENU;
  activeNav: boolean;
}

export interface SetGlobalNavIndexAction {
  type: ActionTypes.SET_NAV_INDEX;
  activeIndexNav: number;
}

export interface SetGlobalUserTokenAction {
  type: ActionTypes.SET_USER_TOKEN;
  token: string;
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
  activeIndexNav: number;
  token: string;
}

export interface TableStateInterface {
  selectedValue: any[];
  rowPerPage: number;
  pageTable: number;
}

export interface SetTableSelectedRowAction {
  type: ActionTypes.SET_SELECTED_ROW_TABLE;
  selectedValue: any[];
}

export interface SetTableRowPageAction {
  type: ActionTypes.SET_TABLE_ROW_PER_PAGE;
  rowPerPage: number;
}

export interface SetTablePageAction {
  type: ActionTypes.SET_TABLE_PAGE;
  pageTable: number;
}

export type ActionPayloadTable =
  | SetTableSelectedRowAction
  | SetTableRowPageAction
  | SetTablePageAction;

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

export interface GlobalInitInterface {
  loading: boolean;
  activeNav: boolean;
  activeIndexNav: number;
  token: string;
}

export interface GlobalSliceInterface extends GlobalInitInterface {
  setLoading: () => void;
  setActiveNav: () => void;
  setActiveIndexNav: (index: number) => void;
  setTokenUser: (token: string) => void;
}

export interface TableInitInterface {
  selectedValue: any[];
  rowPerPage: number;
  pageTable: number;
}

export interface TableSliceInterface extends TableInitInterface {
  setSelectedValue: (selectedValue: any[]) => void;
  setRowPerPage: (rowPerPage: number) => void;
  setPageTable: (pageTable: number) => void;
}
