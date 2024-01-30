/* eslint-disable import/no-unresolved */
import * as React from "react";
import {
  BreadCrumbInterface,
  MainTableColumnInterface,
  StateMenuMaster,
} from "~/interface";
import { MenuMasterActionGet } from "~/store/action/menu-master-action";
import { ReducerMenuMaster } from "~/store/reducer/menu-master";
import { useCombinedStore } from "~/store/use-store/combine-store";

const initState: StateMenuMaster = {
  loading: true,
  count: 0,
  data: [],
};

function UseMasterMenu() {
  const [state, dispatch] = React.useReducer(ReducerMenuMaster, initState);
  const { loading, count, data } = state;
  const { pageTable, rowPerPage } = useCombinedStore();
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const breadcrumb: BreadCrumbInterface[] = [
    {
      name_nav: "Menu Master",
      link: "/master/menu",
    },
  ];

  const tableColumn: MainTableColumnInterface[] = [
    {
      label: "Menu Name",
      value: "menu_name",
      align: "left",
      visible: true,
    },
    {
      label: "Title",
      value: "title_menu",
      align: "left",
      visible: true,
    },
    {
      label: "Path Url",
      value: "path",
      align: "left",
      visible: true,
    },
    {
      label: "Is Submenu",
      value: "is_submenu",
      align: "left",
      visible: true,
      type: "boolean",
    },
    {
      label: "Parent Menu",
      value: "parent_name",
      align: "left",
      visible: true,
    },
    {
      label: "Date Created",
      value: "created_at",
      align: "left",
      visible: true,
      type: "datetime",
    },
    {
      label: "Date Updated",
      value: "updated_at",
      align: "left",
      visible: true,
      type: "datetime",
    },
  ];

  const getMenuData = React.useCallback(async () => {
    await MenuMasterActionGet(dispatch, pageTable, rowPerPage);
  }, [pageTable, rowPerPage]);

  return {
    getMenuData,
    loading,
    count,
    data,
    pageTable,
    rowPerPage,
    tableColumn,
    breadcrumb,
    openModal,
    setOpenModal,
  };
}

export default UseMasterMenu;
