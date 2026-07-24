import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import ForgotPassword from "@/features/auth/pages/ForgotPassword";
import Profile from "@/features/auth/pages/Profile";

import Dashboard from "@/features/dashboard/pages/Dashboard";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    // Public Routes
    {
        element: (
            <PublicRoute>
                <AuthLayout />
            </PublicRoute>
        ),
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />,
            },
        ],
    },

    // Protected Routes
    {
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
        ],
    },

    {
        path: "*",
        element: <h1>404 Not Found</h1>,
    },
]);

export default router;