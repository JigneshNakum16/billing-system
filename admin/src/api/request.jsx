import axios, { isAxiosError } from "axios";
import Cookies from "js-cookie";

class RequestClass {
  axios;

  constructor() {
    this.axios = axios.create({
      timeout: 60000,
      withCredentials: true,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
  }

  async call(config, download = false) {
    try {
      const token = Cookies.get("token");
      const serverBaseUrl =
        process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

      const headers = {
        Accept: "application/json",
        "Content-Type": config?.headers?.contentType ?? "application/json",
        Authorization: `Bearer ${token}`,
      };
    

      const res = await this.axios.request({
        baseURL: serverBaseUrl,
        headers,
        ...config,
      });

      if (download) return res;

      return {
        data: res?.data,
        status: 1,
      };
    } catch (error) {
      if (isAxiosError(error)) {
        const errorStatus = error?.response?.status || null;
        const data = error?.response?.data || null;

        return {
          status: 0,
          errorStatus,
          message: error.message,
          data,
        };
      }
    }
  }
}

const Request = new RequestClass();
export { Request };
