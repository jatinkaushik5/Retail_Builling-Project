import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://backend-backend-app-production.up.railway.app";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default api;