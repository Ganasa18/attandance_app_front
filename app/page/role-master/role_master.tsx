/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
import * as React from "react";
("react");
import { toast } from "sonner";
import MainTable from "~/components/template/table/main_table";
import BreadCrumb from "~/components/ui/breadcrumb";
import ModalComp from "~/components/ui/custom-modal";
import { HiOutlineDotsHorizontal } from "react-icons/hi/index.js";
import {
  BreadCrumbInterface,
  MainTableColumnInterface,
} from "~/interface/component_interface";
import {
  ResponseDataTable,
  RoleResponseType,
} from "~/interface/response_interface";
import axiosFunc, { cancelRequest } from "~/lib/axios_func";
import { useStore } from "~/store/use-store/use_store";
import { BodyModalRoleCreate } from "./modal";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { formatDateString } from "~/lib/table_formater";

const RoleMasterPage = () => {
  const [dataRoles, setDataRoles] = React.useState<RoleResponseType[] | []>([]);
  const [dataRole, setDataRole] = React.useState<RoleResponseType>({});
  const [count, setCount] = React.useState<number | undefined>(0);
  const [state] = useStore();
  const { pageTable, rowPerPage } = state.tableReducer;
  const [loading, setLoading] = React.useState<boolean>(true);
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

  // const collapsibleColumn: CollapseTableColumnInterface[] = [
  //   {
  //     label: "Head 1",
  //     value: "head_one",
  //   },
  //   {
  //     label: "Head 2",
  //     value: "head_two",
  //   },
  //   {
  //     label: "Head 3",
  //     value: "head_three",
  //   },
  //   {
  //     label: "Head 4",
  //     value: "head_four",
  //   },
  // ];

  const handleEdit = (row: RoleResponseType) => {
    console.log(row, "ROW VALUE");
    setDataRole(row);
    setOpenModalEdit(!openModalEdit);
  };

  const getRoleData = React.useCallback(async () => {
    cancelRequest();
    setLoading(true);
    const url = `/api/v1/role?page=${pageTable}&limit=${rowPerPage}`;
    const response = await axiosFunc({
      method: "get",
      url: url,
    });
    const res: ResponseDataTable<RoleResponseType[]> = response?.data;
    if (res.code == 200) {
      setDataRoles(res.listData || []);
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
    getRoleData();
    return () => {
      cancelRequest();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTable, rowPerPage]);

  return (
    <>
      <div className="w-full">
        <div className="overflow-x-auto">
          <div className="sm:px-6 w-full ">
            {/* BREAD CRUMB */}
            <BreadCrumb navigation={breadcrumb} />
            {/* TABLE */}
            <MainTable
              titleTable="Master Table List"
              data={dataRoles}
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
    </>
  );
};

export default RoleMasterPage;
