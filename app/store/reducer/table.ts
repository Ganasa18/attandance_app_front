/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { ActionTypes, TableStateInterface } from "~/interface/interface_store";

const initTable = {
  selectedValue: [] as any[],
  pageTable: 1,
  rowPerPage: 10,
};

const tableReducer = (state: TableStateInterface, payload: any) => {
  switch (payload.type) {
    case ActionTypes.SET_SELECTED_ROW_TABLE:
      return {
        ...state,
        selectedValue: payload.action,
      };
    case ActionTypes.SET_TABLE_ROW_PER_PAGE:
      return {
        ...state,
        rowPerPage: payload.action,
      };
    case ActionTypes.SET_TABLE_PAGE:
      return {
        ...state,
        pageTable: payload.action,
      };

    default:
      return state;
  }
};

export default tableReducer;
export { initTable };
