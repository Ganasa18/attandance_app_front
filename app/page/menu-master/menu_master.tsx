/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
import * as React from "react";
import { toast } from "sonner";
import MainTable from "~/components/template/table/main_table";
import BreadCrumb from "~/components/ui/breadcrumb";
import ModalComp from "~/components/ui/custom-modal";
import {
  BreadCrumbInterface,
  MainTableColumnInterface,
} from "~/interface/component_interface";
import {
  MenuResponseType,
  ResponseDataTable,
} from "~/interface/response_interface";
import axiosFunc, { cancelRequest } from "~/lib/axios_func";
import { useStore } from "~/store/use-store/use_store";
import { BodyModalMenuCreate } from "./modal";

const MenuMasterPage = () => {
  const [dataMenus, setDataMenus] = React.useState<MenuResponseType[] | []>([]);
  const [count, setCount] = React.useState<number | undefined>(0);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [state] = useStore();
  const { pageTable, rowPerPage } = state.tableReducer;
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
    cancelRequest();
    setLoading(true);
    const url = `/api/v1/menu?page=${pageTable}&limit=${rowPerPage}`;
    const response = await axiosFunc({
      method: "get",
      url: url,
    });
    const res: ResponseDataTable<MenuResponseType[]> = response?.data;
    if (res.code == 200) {
      setDataMenus(res.listData || []);
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
    getMenuData();
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
              titleTable="Master Menu List"
              data={dataMenus}
              column={tableColumn}
              isClientPaginate={false}
              isLoading={loading}
              count={count}
              hasCreateButton={() => setOpenModal(true)}
            />
          </div>
        </div>
      </div>
      <ModalComp
        title="Create New Menu"
        body={
          <BodyModalMenuCreate
            refreshData={getMenuData}
            closeModal={() => setOpenModal(false)}
          />
        }
        modalOpen={openModal}
        onClose={() => setOpenModal(!openModal)}
      />
    </>
  );
};

export default MenuMasterPage;
