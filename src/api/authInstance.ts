import axios from "axios";

const AUTH_URL = import.meta.env.VITE_AUTH_ENDPOINT

export const authInstance = axios.create({
  baseURL: AUTH_URL,
  headers: {
    'Content-Type': 'applications/json',
  }
});
