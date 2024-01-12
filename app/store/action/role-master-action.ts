/* eslint-disable import/no-unresolved */
import { toast } from "sonner";
import { ActionTypes, SetActionRoleMaster } from "~/interface";
import {
  ResponseDataTable,
  RoleResponseType,
} from "~/interface/response_interface";

import { ServiceGetAllRole } from "~/service/role-master";

export const RoleMasterActionGet = async (
  dispatch: React.Dispatch<SetActionRoleMaster>,
  pageTable: number,
  rowPerPage: number
) => {
  dispatch({ type: ActionTypes.SET_LOADING, loading: true });
  const res: ResponseDataTable<RoleResponseType[]> = await ServiceGetAllRole(
    pageTable,
    rowPerPage
  );
  if (res.code == 200) {
    dispatch({ type: ActionTypes.SET_DATA, data: res.listData! });
    dispatch({
      type: ActionTypes.SET_COUNT,
      count: res.pageInfo!.total!,
    });

    setTimeout(() => {
      dispatch({ type: ActionTypes.SET_LOADING, loading: false });
    }, 800);
  } else {
    toast.error("SOMETHING WENT WRONG");
    dispatch({ type: ActionTypes.SET_LOADING, loading: false });
  }
};
