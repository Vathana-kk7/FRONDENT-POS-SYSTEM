import { useState } from "react";
import AuthService from "../services/auth.service";

export default function useAuth() {

    const [loading, setLoading] = useState(false);

    const login = async (data) => {

        try {

            setLoading(true);

            const response = await AuthService.login(data);

            localStorage.setItem("token", response.data.token);

            return response.data;

        } finally {

            setLoading(false);

        }

    };

    const register = async (data) => {

        try {

            setLoading(true);

            const response = await AuthService.register(data);

            return response.data;

        } finally {

            setLoading(false);

        }

    };

    const logout = async () => {

        await AuthService.logout();

        localStorage.removeItem("token");

    };

    return {

        login,
        register,
        logout,
        loading,

    };
}