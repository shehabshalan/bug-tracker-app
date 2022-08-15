import axios from "axios";
import { Endpoints } from "./endpoints";

export const axiosInstance = () => {
  axios.create({
    baseURL: Endpoints.baseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
