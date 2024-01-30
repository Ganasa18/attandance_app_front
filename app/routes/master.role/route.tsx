/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import * as React from "react";
import PageLayout from "~/components/template/base/page_layout";
import MainTable from "~/components/template/table/main_table";
import BreadCrumb from "~/components/ui/breadcrumb";
import ModalComp from "~/components/ui/custom-modal";
import { requireAuthCookie } from "~/lib/auth";
import UseMasterRole from "./function";
import { BodyModalRoleCreate } from "./modal";

export const meta: MetaFunction = () => {
  return [
    { title: "Role Page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId: string = await requireAuthCookie(request);
  return userId;
};

export default function MasterRole() {
  const {
    getRoleData,
    pageTable,
    rowPerPage,
    loading,
    count,
    data,
    breadcrumb,
    tableColumn,
    setOpenModal,
    openModal,
    dataRole,
    openModalEdit,
    setOpenModalEdit,
  } = UseMasterRole();

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
