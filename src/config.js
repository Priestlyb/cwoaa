import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://cwoaa-back-end.onrender.com",
  withCredentials: true,
});


// http://localhost:9000

// https://cwoaa-back-end.onrender.com