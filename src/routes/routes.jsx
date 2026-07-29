import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import LoginPage from "../features/auth/pages/Login";
import RegisterPage from "../features/auth/pages/Register";
import DashboardPage from "../features/dashboard/pages/Dashboard";
import GoogleCallback from "../features/auth/pages/GoogleCallback";
import Product from "../features/product/pages/product";
import Category from "../features/category/pages/category";

export const router = createBrowserRouter([
  // 1. Public Routes ប្រើប្រាស់ AuthLayout
  {
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },      
      // Google callback
      { path: "/auth/callback", element: <GoogleCallback /> },
      { path: "/auth/:provider/callback", element: <GoogleCallback /> },

    ],
  },

  // 2. Private Routes ប្រើប្រាស់ DashboardLayout និង PrivateRoute
  {
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      {path : "/product", element: <Product/> },
      {path : "/category", element : <Category /> },
    ],
  },
]);