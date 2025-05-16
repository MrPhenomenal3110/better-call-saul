import { useUserContext } from "@providers/UserProvider";

export const useUser = () => {
  const { token, setToken } = useUserContext();

  return {
    token,
    setToken,
  };
};
