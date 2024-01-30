/* eslint-disable import/no-unresolved */
import * as React from "react";
import { Button } from "~/components/ui/button";
import {
  BreadCrumbInterface,
  MainTableColumnInterface,
  StateDatabaseUser,
  UserDatabaseResponseType,
} from "~/interface";
import { DatabaseUserActionGet } from "~/store/action/database-user-action";
import { ReducerDatabaseUser } from "~/store/reducer/database-user";
import { useCombinedStore } from "~/store/use-store/combine-store";

const initState: StateDatabaseUser = {
  loading: true,
  count: 0,
  data: [],
};

function UseManagementUser() {
  const [state, dispatch] = React.useReducer(ReducerDatabaseUser, initState);
  const { loading, count, data } = state;
  const { pageTable, rowPerPage } = useCombinedStore();
  const [openModalCreate, setOpenModalCreate] = React.useState<boolean>(false);
  const breadcrumb: BreadCrumbInterface[] = [
    {
      name_nav: "Database Users",
      link: "/management/users",
    },
  ];

  const UserCta = (props: UserDatabaseResponseType) => {
    return (
      <Button className="text-sm" variant={"link"} size={"sm"}>
        {props.role_name ? props.role_name : "no role"}
      </Button>
    );
  };

  const tableColumn: MainTableColumnInterface[] = [
    {
      label: "Username",
      value: "name",
      align: "left",
      visible: true,
    },
    {
      label: "Email",
      value: "email",
      align: "left",
      visible: true,
    },
    {
      label: "Is Active",
      value: "is_active",
      align: "left",
      visible: true,
      type: "boolean",
    },
    {
      label: "Role",
      value: "role_name",
      align: "center",
      visible: true,
      type: "custom",
      reactComponent: <UserCta />,
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

  const getUsersData = React.useCallback(async () => {
    await DatabaseUserActionGet(dispatch, pageTable, rowPerPage);
  }, [pageTable, rowPerPage]);

  return {
    loading,
    count,
    data,
    openModalCreate,
    setOpenModalCreate,
    breadcrumb,
    tableColumn,
    getUsersData,
    pageTable,
    rowPerPage,
  };
}

export default UseManagementUser;
