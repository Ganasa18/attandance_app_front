/* eslint-disable import/no-unresolved */
import { toast } from "sonner";
import {
  ActionTypes,
  MenuResponseType,
  ResponseDataTable,
  SetActionMenuMaster,
} from "~/interface";
import { ServiceGetAllMenu } from "~/service/menu-master";

export const MenuMasterActionGet = async (
  dispatch: React.Dispatch<SetActionMenuMaster>,
  pageTable: number,
  rowPerPage: number,
  token: string
) => {
  dispatch({ type: ActionTypes.SET_LOADING, loading: true });

  const res: ResponseDataTable<MenuResponseType[]> = await ServiceGetAllMenu(
    pageTable,
    rowPerPage,
    token
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
