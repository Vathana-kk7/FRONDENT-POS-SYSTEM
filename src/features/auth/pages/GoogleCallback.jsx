import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import AuthService from "../services/auth.service";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      try {
        // 1. ហៅ /api/user ដើម្បីទាញយក Data របស់ User ដែលទើប Login តាម Google
        const userData = await AuthService.getUser();
        const normalizedUser = userData?.data ?? userData?.user ?? userData;

        if (normalizedUser) {
          // 2. Set user ចូលទៅក្នុង Context
          setUser(normalizedUser);
          // 3. ជោគជ័យ -> រត់ទៅ Dashboard
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("Google Auth Error:", error);
        navigate("/login", { replace: true });
      }
    };

    handleGoogleAuth();
  }, [navigate, setUser]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg font-medium text-gray-600">Signing in with Google...</p>
    </div>
  );
}