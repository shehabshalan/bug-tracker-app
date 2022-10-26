import axios from "axios";
import { Endpoints } from "./endpoints";

const axiosInstance = axios.create({
  baseURL: `${Endpoints.baseUrl}`,
  headers: {
    Authorization: `Bearer ${JSON.parse(
      localStorage.getItem("token") as string
    )}`,
  },
});

export default axiosInstance;
