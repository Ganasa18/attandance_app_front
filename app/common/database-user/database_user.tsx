/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
import * as React from "react";
import { toast } from "sonner";
import MainTable from "~/components/template/table/main_table";
import BreadCrumb from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import ModalComp from "~/components/ui/custom-modal";
import {
  ActionTypes,
  BreadCrumbInterface,
  MainTableColumnInterface,
  ResponseDataTable,
  StateDatabaseUser,
  UserDatabaseResponseType,
} from "~/interface";
import { cancelRequest } from "~/lib/axios_func";
import { ServiceGetDatabaseUser } from "~/service/database-user";
import { ReducerDatabaseUser } from "~/store/reducer/database-user";
import { useStore } from "~/store/use-store/use_store";
import { BodyModalUserCreate } from "./modal";

const initState: StateDatabaseUser = {
  loading: true,
  count: 20,
  data: [],
};

const DatabaseUsersPage = () => {
  const [globalState] = useStore();
  const [state, dispatch] = React.useReducer(ReducerDatabaseUser, initState);
  const { loading, count, data } = state;
  const { pageTable, rowPerPage } = globalState.tableReducer;
  const { token } = globalState.globalReducer;
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
    cancelRequest();
    dispatch({ type: ActionTypes.SET_LOADING, loading: true });
    const params = new URLSearchParams();
    const res: ResponseDataTable<UserDatabaseResponseType[]> =
      await ServiceGetDatabaseUser(params, pageTable, rowPerPage, token);
    if (res.code == 200) {
      dispatch({ type: ActionTypes.SET_DATA, data: res.listData! });
      dispatch({
        type: ActionTypes.SET_COUNT,
        count: res.pageInfo!.total!,
      });
      setTimeout(() => {
        dispatch({ type: ActionTypes.SET_LOADING, loading: false });
      }, 800);
    } else {
      toast.error("SOMETHING WENT WRONG");
      dispatch({ type: ActionTypes.SET_LOADING, loading: false });
    }
    // await DatabaseUserActionGet(dispatch, pageTable, rowPerPage);
  }, [pageTable, rowPerPage, token]);

  React.useEffect(() => {
    getUsersData();
    return () => {
      cancelRequest();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTable, rowPerPage]);

  return (
    <>
      <div className="w-full">
        <div className="overflow-x-auto">
          <div className="sm:px-6 w-full">
            {/* BREAD CRUMB */}
            <BreadCrumb navigation={breadcrumb} />
            {/* TABLE */}
            <MainTable
              titleTable="List Users Account"
              data={data}
              column={tableColumn}
              isClientPaginate={false}
              isLoading={loading}
              count={count}
              hasCreateButton={() => setOpenModalCreate(true)}
            />

            <ModalComp
              title="Register New User"
              body={
                <BodyModalUserCreate
                  refreshData={getUsersData}
                  closeModal={() => setOpenModalCreate(false)}
                />
              }
              modalOpen={openModalCreate}
              onClose={() => setOpenModalCreate(!openModalCreate)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DatabaseUsersPage;
