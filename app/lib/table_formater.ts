/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MainTableColumnInterface } from "~/interface/component_interface";

export function formatDateString(
  dateTimeString: string,
  type: string = "date"
) {
  const date = new Date(dateTimeString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  if (type === "date") {
    return `${day}/${month}/${year}`;
  } else if (type === "datetime") {
    return `${day}/${month}/${year}:${hours}:${minutes}`;
  } else {
    return `${day}/${month}/${year}`;
  }
}

export const updateTableColumn = (
  tableColumn: MainTableColumnInterface[],
  row: MainTableColumnInterface,
  status: boolean,
  setTableColumn: any
) => {
  const columnIndex = tableColumn.findIndex(
    (column: any) => column.value === row.value
  );

  if (columnIndex !== -1) {
    const updatedTableColumn = [...tableColumn];

    switch (status) {
      case true:
        updatedTableColumn[columnIndex].sort = "asc";
        break;
      case false:
        updatedTableColumn[columnIndex].sort = "desc";
        break;
      default:
    }

    setTableColumn(updatedTableColumn);
  }
};
