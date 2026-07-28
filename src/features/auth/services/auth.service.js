import { publicApi, privateApi } from "../../../services/api";

const AuthService = {
    async login(data) {
        // 1. យក CSRF Cookie
        await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
        });

        // 2. Login
        const response = await publicApi.post("/login", data);

        return response.data;
    },

    async register(data) {
        const response = await publicApi.post("/register", data);
        return response.data;
    },

    async logout() {
        const response = await privateApi.post("/logout");
        return response.data;
    },
};

export default AuthService;