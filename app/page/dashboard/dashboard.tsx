/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { useSearchParams } from "@remix-run/react";
import * as React from "react";
import { toast } from "sonner";
import MainTable from "~/components/template/table/main_table";
import BreadCrumb from "~/components/ui/breadcrumb";
import {
  BreadCrumbInterface,
  MainTableColumnInterface,
} from "~/interface/component_interface";
import {
  ActionDashboardTypes,
  StateDashboard,
} from "~/interface/dashboard_interface";
import { cancelRequest } from "~/lib/axios_func";
import { updateTableColumn } from "~/lib/table_formater";
import { ServiceGetUserData } from "~/service/dashboard";
import { ReducerDashboard } from "~/store/reducer/dashboard";

import { useStore } from "~/store/use-store/use_store";

const initState: StateDashboard = {
  loading: true,
  count: 20,
  data: [],
};

function DashboardPage() {
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
    dispatch({ type: ActionDashboardTypes.SET_LOADING, loading: true });
    const params = new URLSearchParams();
    const res = await ServiceGetUserData(params, pageTable, rowPerPage);
    if (res.status == 200) {
      res.data.data;
      dispatch({ type: ActionDashboardTypes.SET_DATA, data: res.data.data });
      dispatch({
        type: ActionDashboardTypes.SET_COUNT,
        count: res.data.total,
      });
      params.set("page", `${pageTable}`);
      params.set("per_page", `${rowPerPage}`);
      setSearchParams(params);
      setTimeout(() => {
        dispatch({ type: ActionDashboardTypes.SET_LOADING, loading: false });
      }, 800);
    } else {
      toast.error("SOMETHIN WENT WRONG");
      dispatch({ type: ActionDashboardTypes.SET_LOADING, loading: false });
    }
  }, [pageTable, rowPerPage, setSearchParams]);

  React.useEffect(() => {
    getUserData();
    return () => {
      cancelRequest();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowPerPage, pageTable]);

  return (
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
  );
}

export default DashboardPage;
