/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi/index.js";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  BreadCrumbInterface,
  MainTableColumnInterface,
  RoleResponseType,
  StateRoleMaster,
} from "~/interface";
import { formatDateString } from "~/lib/table_formater";
import { RoleMasterActionGet } from "~/store/action/role-master-action";
import { ReducerRoleMaster } from "~/store/reducer/role-master";
import { useCombinedStore } from "~/store/use-store/combine-store";

const initState: StateRoleMaster = {
  loading: true,
  count: 0,
  data: [],
};

function UseMasterRole() {
  const [dataRole, setDataRole] = React.useState<RoleResponseType>({});
  const { pageTable, rowPerPage } = useCombinedStore();
  const [state, dispatch] = React.useReducer(ReducerRoleMaster, initState);
  const { loading, count, data } = state;
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = React.useState<boolean>(false);
  const breadcrumb: BreadCrumbInterface[] = [
    {
      name_nav: "Role Master",
      link: "/master/role",
    },
  ];

  const RoleCta = (props: RoleResponseType) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="flex">
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <HiOutlineDotsHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => handleEdit(props)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const tableColumn: MainTableColumnInterface[] = [
    {
      label: "Role Name",
      value: "role_name",
      align: "left",
      visible: true,
    },
    {
      label: "Date Created",
      value: "createdAt",
      align: "right",
      visible: true,
      valueFormatter(value: any) {
        return formatDateString(value, "datetime");
      },
    },
    {
      label: "Date Update",
      value: "updatedAt",
      align: "right",
      visible: true,
      type: "date",
    },
    {
      label: "",
      value: "id",
      visible: true,
      type: "custom",
      align: "left",
      className: "w-2",
      reactComponent: <RoleCta />,
    },
  ];

  const handleEdit = (row: RoleResponseType) => {
    setDataRole(row);
    setOpenModalEdit(!openModalEdit);
  };

  const getRoleData = React.useCallback(async () => {
    await RoleMasterActionGet(dispatch, pageTable, rowPerPage);
  }, [pageTable, rowPerPage]);

  return {
    getRoleData,
    pageTable,
    rowPerPage,
    tableColumn,
    data,
    count,
    loading,
    dataRole,
    setDataRole,
    openModal,
    setOpenModal,
    openModalEdit,
    setOpenModalEdit,
    breadcrumb,
  };
}

export default UseMasterRole;
