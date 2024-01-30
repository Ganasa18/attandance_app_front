/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { StateCreator } from "zustand";
import { TableInitInterface, TableSliceInterface } from "~/interface";

// const initTable = {
//   selectedValue: [] as any[],
//   pageTable: 1,
//   rowPerPage: 10,
// };

// const tableReducer = (
//   state: TableStateInterface,
//   action: ActionPayloadTable
// ) => {
//   switch (action.type) {
//     case ActionTypes.SET_SELECTED_ROW_TABLE:
//       return {
//         ...state,
//         selectedValue: (action as SetTableSelectedRowAction).selectedValue,
//       };
//     case ActionTypes.SET_TABLE_ROW_PER_PAGE:
//       return {
//         ...state,
//         rowPerPage: (action as SetTableRowPageAction).rowPerPage,
//       };
//     case ActionTypes.SET_TABLE_PAGE:
//       return {
//         ...state,
//         pageTable: (action as SetTablePageAction).pageTable,
//       };

//     default:
//       return state;
//   }
// };

// export default tableReducer;
// export { initTable };

const INIT_STATE_TABLE: Pick<TableInitInterface, keyof TableInitInterface> = {
  selectedValue: [] as any[],
  pageTable: 1,
  rowPerPage: 10,
};

const createTableSlice: StateCreator<
  TableSliceInterface,
  [],
  [],
  TableSliceInterface
> = (set) => ({
  ...INIT_STATE_TABLE,
  setSelectedValue: (selectedValue) => {
    return set({ selectedValue: selectedValue });
  },
  setRowPerPage: (rowPerPage) => {
    return set({ rowPerPage: rowPerPage });
  },
  setPageTable: (pageTable) => {
    return set({ pageTable: pageTable });
  },
});

export { createTableSlice };
