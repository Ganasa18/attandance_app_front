/* eslint-disable import/no-unresolved */
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import * as React from "react";
import PageLayout from "~/components/template/base/page_layout";
import MainTable from "~/components/template/table/main_table";
import BreadCrumb from "~/components/ui/breadcrumb";
import ModalComp from "~/components/ui/custom-modal";
import {
  BreadCrumbInterface,
  MainTableColumnInterface,
  StateMenuMaster,
} from "~/interface";
import { requireAuthCookie } from "~/lib/auth";
import { MenuMasterActionGet } from "~/store/action/menu-master-action";
import { ReducerMenuMaster } from "~/store/reducer/menu-master";
import { useStore } from "~/store/use-store/use_store";
import { BodyModalMenuCreate } from "./modal";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Menu Page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId: string = await requireAuthCookie(request);
  return userId;
};

const initState: StateMenuMaster = {
  loading: true,
  count: 0,
  data: [],
};

export default function MasterRole() {
  const userId = useLoaderData<typeof loader>();
  const [globalState] = useStore();
  const [state, dispatch] = React.useReducer(ReducerMenuMaster, initState);
  const { loading, count, data } = state;
  const { pageTable, rowPerPage } = globalState.tableReducer;
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
    await MenuMasterActionGet(dispatch, pageTable, rowPerPage, userId);
  }, [pageTable, rowPerPage, userId]);

  React.useEffect(() => {
    getMenuData();
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
              titleTable="Master Menu List"
              data={data}
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
    </PageLayout>
  );
}
