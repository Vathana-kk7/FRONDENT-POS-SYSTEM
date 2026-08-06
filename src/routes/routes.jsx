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
import Setting from "../features/setting/pages/Setting";
import Customer from "../features/customer/page/customer";
import SaleOrder from "../features/sale/SaleOrder/page/SaleOrder";
import Invoice from "../features/sale/Invoice/page/Invoice";
import Payment from "../features/sale/Payment/page/Payment";
import Return from "../features/sale/Return/page/Return";
import SalePos from "../features/sale/SalePos/page/SalePos";
import Supplier from "../features/Supplier/page/Supplier";
import PurchaseOrder from "../features/Purchase/PurchaseOrder/pages/PurchaseOrder";
import PurchaseReturn from "../features/Purchase/PurchaseReturn/pages/PurchaseReturn";
import GoodReceived from "../features/Purchase/GoodReceived/pages/GoodReceived";
import StockTransferHistory from "../features/StockTransfer/StockTransferHistory/pages/StockTransferHistory";
import StockTransfer from "../features/StockTransfer/StockTransfer/pages/StockTransfer";
import StockTransferRequest from "../features/StockTransfer/StockTransferRequest/pages/StockTransferRequest";
import Report from "../features/Report/pages/Report";
import AllUsers from "../features/Users/AllUsers/pages/AllUsers";
import Roles from "../features/Users/Roles/pages/Roles";

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
      {path: "/dashboard", element: <DashboardPage /> },
      {path : "/product", element: <Product/> },
      {path : "/category", element : <Category /> },
      {path : "/customer", element : <Customer/>},
      {path : "/setting", element : <Setting/>},
      {path : "/saleorder", element : <SaleOrder/>},
      {path : "/invoice", element : <Invoice/>},
      {path : "/payment", element : <Payment/>},
      {path : "/return", element : <Return/>},
      {path : "/salepos", element : <SalePos/>},
      {path : "/supplier", element : <Supplier/>},
      {path : "/purchaseorder", element : <PurchaseOrder/>},
      {path : "/purchasereturn", element : <PurchaseReturn/>},
      {path : "/goodreceived", element : <GoodReceived/>},
      {path : "/transferhistory", element : <StockTransferHistory/>},
      {path : "/stocktransfer", element : <StockTransfer/>},
      {path : "/transferrequest", element : <StockTransferRequest/>},
      {path : "/reports", element : <Report/>},
      {path : "/alluser", element : <AllUsers/>},
      {path : "/roles", element : <Roles/>},

    ],
  },
]);