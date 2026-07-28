import { useState } from "react";
import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";
import { useAuthContext } from "../../../context/AuthContext";

export default function useAuth() {
  const { user, loading: authLoading, loginContext, logoutContext } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const validate = (type, formData) => {
    const schema = type === "login" ? loginSchema : registerSchema;
    const result = schema.safeParse(formData);

    if (!result.success) {
      const newErrors = {};
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message;
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const login = async (formData) => {
    setErrors({});
    setApiError("");

    const isValid = validate("login", formData);
    if (!isValid) return false;

    try {
      setLoading(true);
      const res = await loginContext(formData);

      if (res.status === "success" || res.data || res.user) {
        return true; // 🔑 ត្រឡប់ true ដើម្បី navigate ទៅ Dashboard
      }
      return false;
    } catch (error) {
      setApiError(error.response?.data?.message || "មានបញ្ហាក្នុងការ Log in");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearFieldError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const logout = async () => {
    await logoutContext();
  };

  const handlegooglelogin = (e) => {
    if (e) e.preventDefault();
    window.location.href = "http://localhost:8000/api/auth/google";
  };

  return {
    user,
    login,
    logout,
    loading: loading || authLoading,
    errors,
    apiError,
    clearFieldError,
    handlegooglelogin,
  };
}