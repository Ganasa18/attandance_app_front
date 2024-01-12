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
  BreadCrumbInterface,
  MainTableColumnInterface,
} from "~/interface/component_interface";
import {
  ResponseDataTable,
  UserDatabaseResponseType,
} from "~/interface/response_interface";
import axiosFunc, { cancelRequest } from "~/lib/axios_func";
import { useStore } from "~/store/use-store/use_store";
import { BodyModalUserCreate } from "./modal";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const DatabaseUsersPage = () => {
  const [dataUsers, setDataUsers] = React.useState<
    UserDatabaseResponseType[] | []
  >([]);
  const [count, setCount] = React.useState<number | undefined>(0);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [state] = useStore();
  const { pageTable, rowPerPage } = state.tableReducer;
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
    setLoading(true);

    const params = new URLSearchParams();
    const pageParams = params.get("page") || pageTable;
    const perPageParams = params.get("per_page") || rowPerPage;

    const url = `/api/v1/user?page=${pageParams}&limit=${perPageParams}`;
    const response = await axiosFunc({
      method: "get",
      url: url,
      headers: {
        Authorization: cookies.get("token"),
      },
    });
    const res: ResponseDataTable<UserDatabaseResponseType[]> = response?.data;
    if (res.code == 200) {
      setDataUsers(res.listData || []);
      setCount(res.pageInfo?.total);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    } else {
      toast.error("SOMETHING WENT WRONG");
      setLoading(false);
    }
  }, [pageTable, rowPerPage]);

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
              data={dataUsers}
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
