import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_BASE_API_DEV_URL
    : process.env.REACT_APP_BASE_API_PROD_URL;

const token = localStorage.getItem("token");
const parsedToken = token ? JSON.parse(token) : "";

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${parsedToken}`,
  },
});
export default request;
