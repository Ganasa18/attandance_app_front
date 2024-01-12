/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosFunc from "~/lib/axios_func";

const ServiceAuthLogin = async (request: any) => {
  const url = `/api/v1/userLoginWeb`;
  const response = await axiosFunc({
    method: "post",
    url: url,
    data: request,
    baseUrl: "http://127.0.0.1:3002",
  });

  return response.data;
};

export { ServiceAuthLogin };
