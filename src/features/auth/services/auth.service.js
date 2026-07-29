import axios from "axios";
import { publicApi, privateApi } from "../../../services/api";

const authApi = axios.create({
  baseURL: "",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const AuthService = {
    async login(data) {
        await authApi.get("/sanctum/csrf-cookie");
        const response = await publicApi.post("/login", data);
        return response.data;
    },

    async prepareGoogleAuth() {
        await authApi.get("/sanctum/csrf-cookie");
    },

    // 🔑 ប្រើ Endpoint ស្រាប់របស់ Sanctum
    async getUser() {
        try {
            const response = await privateApi.get("/user");
            return response.data;
        } catch (error) {
            if (error?.response?.status === 401) {
                return null;
            }
            throw error;
        }
    },

    async register(data) {
        await authApi.get("/sanctum/csrf-cookie");
        const response = await publicApi.post("/register", data);
        return response.data;
    },

    async logout() {
        const response = await privateApi.post("/logout");
        return response.data;
    },
};

export default AuthService;