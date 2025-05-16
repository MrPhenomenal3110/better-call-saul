import type { AuthPayload } from "@models/apiData";

import client from "./index";

export const register = async (data: AuthPayload) => {
  const res = await client.post("/auth/register", data);
  return res.data; // assuming it returns { token, user }
};

export const login = async (data: AuthPayload) => {
  const res = await client.post("/auth/login", data);
  return res.data;
};
