import { register, login } from "@api/auth";
import type { AuthPayload } from "@models/apiData";

export const useAuth = (setToken: (token: string) => void) => {
  const handleRegister = async (data: AuthPayload) => {
    try {
      const response = await register(data);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const handleLogin = async (data: AuthPayload) => {
    try {
      const response = await login(data);
      setToken(response.token);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return {
    handleRegister,
    handleLogin,
    handleLogout,
  };
};
