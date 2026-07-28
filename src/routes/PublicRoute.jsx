import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // ប្រសិនបើមាន user (បាន Authenticate តាម Cookie រួចរាល់) ឱ្យទៅ Dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Outlet />;
}