/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { useCombinedStore } from "../use-store/combine-store";

const actionCheckedAllTable = async (event: any, data: any) => {
  if (event) {
    useCombinedStore.getState().setSelectedValue(data.slice());
  } else {
    useCombinedStore.getState().setSelectedValue([]);
  }
};

const actionCheckedRowTable = async (row: any, selectedRows: any) => {
  const selectedIndexRow = selectedRows.indexOf(row);
  let newSelected = [];
  if (selectedIndexRow === -1) {
    newSelected = [...selectedRows, row];
  } else {
    newSelected = selectedRows.filter(
      (selectedRow: any) => selectedRow !== row
    );
  }
  useCombinedStore.getState().setSelectedValue(newSelected);
};

export { actionCheckedAllTable, actionCheckedRowTable };
