import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:9000",
  withCredentials: true,
});


// http://localhost:9000/