import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // ប្រសិនបើគ្មាន user (Cookie Expire ឬមិនទាន់ Login) ឱ្យទៅ /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}