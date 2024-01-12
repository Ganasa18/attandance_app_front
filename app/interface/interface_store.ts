/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Action {
  type: ActionTypes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export type ActionPayloadGlobal =
  | {
      type: ActionTypes.SET_LOADING;
      action: boolean;
    }
  | {
      type: ActionTypes.SET_NAV_MENU;
      action: boolean;
    }
  | {
      type: ActionTypes.SET_NAV_INDEX;
      action: number | null;
    };

export interface GlobalStateInterface {
  isLoading: boolean;
  userLogin: object;
  activeNav: boolean;
  activeIndexNav: number | null;
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
}

export enum TypeStoreStorage {
  LOCAL_USER_MENU = "LOCAL_USER_MENU",
  USER_TOKEN = "USER_TOKEN",
}
