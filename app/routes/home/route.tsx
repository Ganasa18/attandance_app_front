/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import * as React from "react";
import PageLayout from "~/components/template/base/page_layout";
import MainTable from "~/components/template/table/main_table";
import BreadCrumb from "~/components/ui/breadcrumb";
import { requireAuthCookie } from "~/lib/auth";
import UseHome from "./function";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard Page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireAuthCookie(request);
  return userId;
};

export default function HomePage() {
  const userId = useLoaderData<typeof loader>();
  const {
    setTokenUser,
    breadcrumb,
    loading,
    count,
    data,
    pageTable,
    rowPerPage,
    tableColumn,
    setTableColumn,
    getUserData,
  } = UseHome();

  React.useEffect(() => {
    getUserData();
    setTokenUser(userId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowPerPage, pageTable]);

  return (
    <PageLayout>
      <div className="w-full">
        <div className="overflow-x-auto">
          <div className="sm:px-6 w-full">
            {/* BREAD CRUMB */}
            <BreadCrumb navigation={breadcrumb} />
            {/* TABLE */}
            <MainTable
              titleTable="Table Title"
              data={data}
              column={tableColumn}
              setTableColumn={setTableColumn}
              isLoading={loading}
              count={count}
              isClientPaginate={false}
              hasCheckbox
              hasShowColumn
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
