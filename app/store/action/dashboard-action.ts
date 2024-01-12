/* eslint-disable import/no-unresolved */
import { SetURLSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { ActionDashboard, ActionTypes } from "~/interface";
import { ServiceGetUserData } from "~/service/dashboard";

const DasboardActionGet = async (
  dispatch: React.Dispatch<ActionDashboard>,
  pageTable: number,
  rowPerPage: number,
  setSearchParams: SetURLSearchParams
) => {
  dispatch({ type: ActionTypes.SET_LOADING, loading: true });
  const params = new URLSearchParams();
  const res = await ServiceGetUserData(params, pageTable, rowPerPage);
  if (res.status == 200) {
    res.data.data;
    dispatch({ type: ActionTypes.SET_DATA, data: res.data.data });
    dispatch({
      type: ActionTypes.SET_COUNT,
      count: res.data.total,
    });
    params.set("page", `${pageTable}`);
    params.set("per_page", `${rowPerPage}`);
    setSearchParams(params);
    setTimeout(() => {
      dispatch({ type: ActionTypes.SET_LOADING, loading: false });
    }, 800);
  } else {
    toast.error("SOMETHIN WENT WRONG");
    dispatch({ type: ActionTypes.SET_LOADING, loading: false });
  }
};

export { DasboardActionGet };
