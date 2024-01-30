/* eslint-disable import/no-unresolved */
import { MenuResponseType, ResponseDataTable } from "~/interface";
import axiosFunc from "~/lib/axios_func";

export const ServiceGetAllMenu = async (
  pageTable: number,
  rowPerPage: number
) => {
  const url = `/api/v1/menu?page=${pageTable}&limit=${rowPerPage}`;
  const response = await axiosFunc({
    method: "get",
    url: url,
  });
  const res: ResponseDataTable<MenuResponseType[]> = response?.data;
  return res;
};
