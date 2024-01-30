/* eslint-disable import/no-unresolved */
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import * as React from "react";
import PageLayout from "~/components/template/base/page_layout";
import MainTable from "~/components/template/table/main_table";
import BreadCrumb from "~/components/ui/breadcrumb";
import ModalComp from "~/components/ui/custom-modal";
import { requireAuthCookie } from "~/lib/auth";
import UseMasterMenu from "./function";
import { BodyModalMenuCreate } from "./modal";

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

export default function MasterMenu() {
  const {
    getMenuData,
    pageTable,
    rowPerPage,
    breadcrumb,
    tableColumn,
    loading,
    data,
    count,
    openModal,
    setOpenModal,
  } = UseMasterMenu();

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
