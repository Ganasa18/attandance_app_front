/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, CancelTokenSource } from "axios";
import { toast } from "sonner";

type PropsAxiosType = {
  method: "get" | "post" | "put" | "delete";
  url: string;
  data?: any;
  baseUrl?: string;
  headers?: AxiosRequestConfig["headers"];
};
let cancel: CancelTokenSource | undefined;

const axiosFunc = async ({
  method,
  url,
  data,
  baseUrl = "http://localhost:3002",
  headers,
}: PropsAxiosType) => {
  if (cancel) {
    cancel.cancel("Request canceled manually");
  }

  const source = axios.CancelToken.source();
  cancel = source;

  const config: AxiosRequestConfig = {
    method,
    url,
    baseURL: baseUrl,
    headers: headers || {},
    cancelToken: source.token,
  };

  if (method === "get") {
    config.params = data;
  } else if (method === "post" || method === "put" || method === "delete") {
    config.data = data;
  }

  try {
    const response = await axios(config);
    return response;
  } catch (error: any) {
    if (axios.isCancel(error)) {
      // Request was canceled
      // console.log("Request canceled", error.message);
    } else {
      // Handle other errors
      console.error("Request error", error);
      toast.error("Request error", {
        description: error.message || "Failed To Request",
      });
    }
    return error.response;
  }
};

export const cancelRequest = () => {
  if (cancel) {
    cancel.cancel("Request canceled manually");
  }
};

export default axiosFunc;
