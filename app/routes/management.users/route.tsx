/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import * as React from "react";
import PageLayout from "~/components/template/base/page_layout";
import MainTable from "~/components/template/table/main_table";
import BreadCrumb from "~/components/ui/breadcrumb";
import ModalComp from "~/components/ui/custom-modal";
import { requireAuthCookie } from "~/lib/auth";
import UseManagementUser from "./function";
import { BodyModalUserCreate } from "./modal";

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

export default function ManagementUsers() {
  // const userId = useLoaderData<typeof loader>();
  const {
    getUsersData,
    pageTable,
    rowPerPage,
    breadcrumb,
    data,
    tableColumn,
    loading,
    count,
    setOpenModalCreate,
    openModalCreate,
  } = UseManagementUser();

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
