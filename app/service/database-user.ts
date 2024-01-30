/* eslint-disable import/no-unresolved */
import { ResponseDataTable, UserDatabaseResponseType } from "~/interface";
import axiosFunc from "~/lib/axios_func";

const ServiceGetDatabaseUser = async (
  params: URLSearchParams,
  pageTable: number,
  rowPerPage: number
) => {
  const pageParams = params.get("page") || pageTable;
  const perPageParams = params.get("per_page") || rowPerPage;
  const url = `/api/v1/user?page=${pageParams}&limit=${perPageParams}`;
  const response = await axiosFunc({
    method: "get",
    url: url,
  });
  const res: ResponseDataTable<UserDatabaseResponseType[]> = response?.data;
  return res;
};

export { ServiceGetDatabaseUser };
