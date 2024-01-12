/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import * as React from "react";
import { BodyModalUserCreate } from "~/common/database-user/modal";
import PageLayout from "~/components/template/base/page_layout";
import MainTable from "~/components/template/table/main_table";
import BreadCrumb from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import ModalComp from "~/components/ui/custom-modal";
import {
  BreadCrumbInterface,
  MainTableColumnInterface,
  StateDatabaseUser,
  UserDatabaseResponseType,
} from "~/interface";
import { requireAuthCookie } from "~/lib/auth";

import { DatabaseUserActionGet } from "~/store/action/database-user-action";
import { ReducerDatabaseUser } from "~/store/reducer/database-user";
import { useStore } from "~/store/use-store/use_store";

export const meta: MetaFunction = () => {
  return [
    { title: "User Database Page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId: string = await requireAuthCookie(request);
  return userId;
};

const initState: StateDatabaseUser = {
  loading: true,
  count: 20,
  data: [],
};

export default function ManagementUsers() {
  const userId = useLoaderData<typeof loader>();
  const [globalState] = useStore();
  const [state, dispatch] = React.useReducer(ReducerDatabaseUser, initState);
  const { loading, count, data } = state;
  const { pageTable, rowPerPage } = globalState.tableReducer;
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
    await DatabaseUserActionGet(dispatch, pageTable, rowPerPage, userId);
    // await DatabaseUserActionGet(dispatch, pageTable, rowPerPage);
  }, [pageTable, rowPerPage, userId]);

  React.useEffect(() => {
    getUsersData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTable, rowPerPage]);

  return (
    <PageLayout>
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
    </PageLayout>
  );
}
