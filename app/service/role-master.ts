/* eslint-disable import/no-unresolved */
import {
  ResponseDataTable,
  RoleResponseType,
} from "~/interface/response_interface";
import axiosFunc from "~/lib/axios_func";

export const ServiceGetAllRole = async (
  pageTable: number,
  rowPerPage: number
) => {
  const url = `/api/v1/role?page=${pageTable}&limit=${rowPerPage}`;
  const response = await axiosFunc({
    method: "get",
    url: url,
  });
  const res: ResponseDataTable<RoleResponseType[]> = response?.data;
  return res;
};
