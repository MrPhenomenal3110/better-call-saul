import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token if available
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
