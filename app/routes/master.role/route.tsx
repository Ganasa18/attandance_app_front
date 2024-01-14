/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import * as React from "react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  BreadCrumbInterface,
  MainTableColumnInterface,
  RoleResponseType,
  StateRoleMaster,
} from "~/interface";
import { requireAuthCookie } from "~/lib/auth";
import { useStore } from "~/store/use-store/use_store";
import { ReducerRoleMaster } from "~/store/reducer/role-master";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { HiOutlineDotsHorizontal } from "react-icons/hi/index.js";
import { formatDateString } from "~/lib/table_formater";
import { cancelRequest } from "~/lib/axios_func";
import { RoleMasterActionGet } from "~/store/action/role-master-action";
import PageLayout from "~/components/template/base/page_layout";
import BreadCrumb from "~/components/ui/breadcrumb";
import MainTable from "~/components/template/table/main_table";
import ModalComp from "~/components/ui/custom-modal";
import { BodyModalRoleCreate } from "./modal";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Role Page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId:string = await requireAuthCookie(request);
  return userId;
};

const initState: StateRoleMaster = {
  loading: true,
  count: 0,
  data: [],
};

export default function MasterRole() {
  const userId = useLoaderData<typeof loader>();
  const [globalState] = useStore();
  const [dataRole, setDataRole] = React.useState<RoleResponseType>({});
  const { pageTable, rowPerPage } = globalState.tableReducer;
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
    console.log(row, "ROW VALUE");
    setDataRole(row);
    setOpenModalEdit(!openModalEdit);
  };

  const getRoleData = React.useCallback(async () => {
    cancelRequest();
    await RoleMasterActionGet(dispatch, pageTable, rowPerPage, userId);
  }, [pageTable, rowPerPage, userId]);

  React.useEffect(() => {
    getRoleData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTable, rowPerPage]);

  return (
    <PageLayout>
      <div className="w-full">
        <div className="overflow-x-auto">
          <div className="sm:px-6 w-full ">
            {/* BREAD CRUMB */}
            <BreadCrumb navigation={breadcrumb} />
            {/* TABLE */}
            <MainTable
              titleTable="Master Table List"
              data={data}
              column={tableColumn}
              isLoading={loading}
              count={count}
              isClientPaginate={false}
              hasCreateButton={() => setOpenModal(true)}
            />
          </div>
        </div>
      </div>
      <ModalComp
        title="Create New Role"
        body={
          <BodyModalRoleCreate
            refreshData={getRoleData}
            closeModal={() => setOpenModal(false)}
          />
        }
        modalOpen={openModal}
        onClose={() => setOpenModal(!openModal)}
      />
      <ModalComp
        title="Edit Role"
        body={
          <BodyModalRoleCreate
            data={dataRole}
            refreshData={getRoleData}
            closeModal={() => setOpenModalEdit(false)}
          />
        }
        modalOpen={openModalEdit}
        onClose={() => setOpenModalEdit(!openModalEdit)}
      />
    </PageLayout>
  );
}