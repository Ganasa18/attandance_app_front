/* eslint-disable import/no-unresolved */
import { toast } from "sonner";
import {
  ActionTypes,
  ResponseDataTable,
  SetActionDatabaseUser,
  UserDatabaseResponseType,
} from "~/interface";
import { ServiceGetDatabaseUser } from "~/service/database-user";

export const DatabaseUserActionGet = async (
  dispatch: React.Dispatch<SetActionDatabaseUser>,
  pageTable: number,
  rowPerPage: number
) => {
  dispatch({ type: ActionTypes.SET_LOADING, loading: true });
  const params = new URLSearchParams();
  const res: ResponseDataTable<UserDatabaseResponseType[]> =
    await ServiceGetDatabaseUser(params, pageTable, rowPerPage);
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
