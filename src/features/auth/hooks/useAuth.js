import { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import AuthService from "../services/auth.service";
import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";
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

      if (res?.success) {
        return true;
      }
      return false;
    } catch (error) {
      setApiError(error.response?.data?.message || error.message || "មានបញ្ហាក្នុងការ Log in");
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

  const register = async (formData) => {
    setErrors({});
    setApiError("");

    const isValid = validate("register", formData);
    if (!isValid) return false;

    try {
      setLoading(true);
      await AuthService.register(formData);
      return true;
    } catch (error) {
      setApiError(error.response?.data?.message || error.message || "Registration failed");
      return false;
    } finally {
      setLoading(false);
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
    register,
    logout,
    loading: loading || authLoading,
    errors,
    apiError,
    clearFieldError,
    handlegooglelogin,
  };
}