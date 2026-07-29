import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

// សម្រាប់ Public Route (Login, Register, ...)
const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // Allow browser send HttpOnly Cookie
  withCredentials: true,
});

export default publicApi;