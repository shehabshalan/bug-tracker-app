import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api/"
    : "https://limitless-reef-02128.herokuapp.com/api/";

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`,
  },
});

export default request;
