/* eslint-disable import/no-unresolved */
import { useSearchParams } from "@remix-run/react";
import React from "react";
import {
  BreadCrumbInterface,
  MainTableColumnInterface,
  StateDashboard,
} from "~/interface";
import { updateTableColumn } from "~/lib/table_formater";
import { DasboardActionGet } from "~/store/action/dashboard-action";
import { ReducerDashboard } from "~/store/reducer/dashboard";
import { useCombinedStore } from "~/store/use-store/combine-store";

const initState: StateDashboard = {
  loading: true,
  count: 20,
  data: [],
};

const UseHome = () => {
  const { setTokenUser } = useCombinedStore();
  const [, setSearchParams] = useSearchParams();
  const breadcrumb: BreadCrumbInterface[] = [];
  const [state, dispatch] = React.useReducer(ReducerDashboard, initState);
  const { loading, count, data } = state;
  const { pageTable, rowPerPage } = useCombinedStore();
  const [tableColumn, setTableColumn] = React.useState<
    MainTableColumnInterface[]
  >([
    {
      label: "ID",
      value: "id",
      align: "left",
      visible: true,
      sortable: true,
      handleSort: (row: MainTableColumnInterface, statusRow: boolean) => {
        handlerSort(row, statusRow);
      },
    },
    {
      label: "Email",
      value: "email",
      align: "left",
      visible: true,
    },
    {
      label: "First Name",
      value: "first_name",
      align: "right",
      visible: true,
    },
    {
      label: "Last Name",
      value: "last_name",
      align: "right",
      visible: false,
    },
    {
      label: "Profile Image",
      value: "avatar",
      align: "center",
      type: "profile",
      visible: false,
      className: "p-2",
    },
  ]);
  const handlerSort = (row: MainTableColumnInterface, status: boolean) => {
    updateTableColumn(tableColumn, row, status, setTableColumn);
  };

  const getUserData = React.useCallback(async () => {
    await DasboardActionGet(dispatch, pageTable, rowPerPage, setSearchParams);
  }, [pageTable, rowPerPage, setSearchParams]);
  return {
    getUserData,
    handlerSort,
    tableColumn,
    setTableColumn,
    pageTable,
    rowPerPage,
    loading,
    count,
    data,
    breadcrumb,
    setSearchParams,
    setTokenUser,
    state,
    dispatch
  };
};

export default UseHome;
