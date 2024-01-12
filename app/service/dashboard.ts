/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosFunc from "~/lib/axios_func";

const ServiceGetUserData = async (
  params: URLSearchParams,
  pageTable: number,
  rowPerPage: number
) => {
  const pageParams = params.get("page") || pageTable;
  const perPageParams = params.get("per_page") || rowPerPage;
  const url = `/api/users?page=${pageParams}&per_page=${perPageParams}`;
  const response = await axiosFunc({
    method: "get",
    url: url,
    baseUrl: "https://reqres.in",
  });
  return response;
};

export { ServiceGetUserData };
