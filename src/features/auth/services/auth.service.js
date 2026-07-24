import { publicApi, privateApi } from "@/services/api";

const AuthService = {

    login(data) {
        return publicApi.post("/login", data);
    },

    register(data) {
        return publicApi.post("/register", data);
    },

    logout() {
        return privateApi.post("/logout");
    },

    me() {
        return privateApi.get("/me");
    },

};

export default AuthService;