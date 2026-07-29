import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import AuthService from "../services/auth.service";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      const fetchUser = async () => {
        const userData = await AuthService.getUser();
        return userData?.data ?? userData?.user ?? userData;
      };

      try {
        console.log("GoogleCallback path:", window.location.pathname);

        let normalizedUser = await fetchUser();
        let attempts = 1;

        while (!normalizedUser && attempts < 6) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          normalizedUser = await fetchUser();
          attempts += 1;
        }

        if (normalizedUser) {
          setUser(normalizedUser);
          window.location.replace("/dashboard");
          return;
        }

        console.warn("Google login did not return an authenticated user after callback.");
        navigate("/login", { replace: true });
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