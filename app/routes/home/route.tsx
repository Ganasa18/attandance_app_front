/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import * as React from "react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import {
  BreadCrumbInterface,
  MainTableColumnInterface,
  StateDashboard,
} from "~/interface";
import { requireAuthCookie } from "~/lib/auth";
import { ReducerDashboard } from "~/store/reducer/dashboard";
import { useStore } from "~/store/use-store/use_store";
import { updateTableColumn } from "~/lib/table_formater";
import { DasboardActionGet } from "~/store/action/dashboard-action";
import PageLayout from "~/components/template/base/page_layout";
import BreadCrumb from "~/components/ui/breadcrumb";
import MainTable from "~/components/template/table/main_table";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard Page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const initState: StateDashboard = {
  loading: true,
  count: 20,
  data: [],
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireAuthCookie(request);
  return userId;
};

export default function HomePage() {
  const [, setSearchParams] = useSearchParams();
  const breadcrumb: BreadCrumbInterface[] = [];
  const [globalState] = useStore();
  const [state, dispatch] = React.useReducer(ReducerDashboard, initState);
  const { loading, count, data } = state;
  const { pageTable, rowPerPage } = globalState.tableReducer;
  const [tableColumn, setTableColumn] = React.useState<
    MainTableColumnInterface[]
  >([
    {
      label: "ID",
      value: "id",
      align: "left",
      visible: true,
      sortable: true,
      handleSort: (row: MainTableColumnInterface, statusRow: boolean) => {
        handlerSort(row, statusRow);
      },
    },
    {
      label: "Email",
      value: "email",
      align: "left",
      visible: true,
    },
    {
      label: "First Name",
      value: "first_name",
      align: "right",
      visible: true,
    },
    {
      label: "Last Name",
      value: "last_name",
      align: "right",
      visible: false,
    },
    {
      label: "Profile Image",
      value: "avatar",
      align: "center",
      type: "profile",
      visible: false,
      className: "p-2",
    },
  ]);
  const handlerSort = (row: MainTableColumnInterface, status: boolean) => {
    updateTableColumn(tableColumn, row, status, setTableColumn);
  };

  const getUserData = React.useCallback(async () => {
    await DasboardActionGet(dispatch, pageTable, rowPerPage, setSearchParams);
  }, [pageTable, rowPerPage, setSearchParams]);

  React.useEffect(() => {
    getUserData();
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
