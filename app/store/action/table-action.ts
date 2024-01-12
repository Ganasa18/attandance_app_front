/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { ActionPayloadTable, ActionTypes } from "~/interface";

type Dispatch = (action: ActionPayloadTable) => void;

const actionCheckedAllTable = async (
  dispatch: Dispatch,
  event: any,
  data: any
) => {
  const typeDispatch: Dispatch = dispatch;
  if (event) {
    typeDispatch({
      type: ActionTypes.SET_SELECTED_ROW_TABLE,
      action: data.slice(),
    });
  } else {
    typeDispatch({ type: ActionTypes.SET_SELECTED_ROW_TABLE, action: [] });
  }
};

const actionCheckedRowTable = async (
  dispatch: Dispatch,
  row: any,
  selectedRows: any
) => {
  const typeDispatch: Dispatch = dispatch;
  const selectedIndexRow = selectedRows.indexOf(row);
  let newSelected = [];
  if (selectedIndexRow === -1) {
    newSelected = [...selectedRows, row];
  } else {
    newSelected = selectedRows.filter(
      (selectedRow: any) => selectedRow !== row
    );
  }

  typeDispatch({
    type: ActionTypes.SET_SELECTED_ROW_TABLE,
    action: newSelected,
  });
};

export { actionCheckedAllTable, actionCheckedRowTable };
