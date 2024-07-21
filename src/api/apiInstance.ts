import axios from "axios";
import { authInstance } from "./authInstance";

const API_URL = import.meta.env.VITE_MAIN_ENDPOINT;

export const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
  }
});

const refresh = async (refresh: string) => {
  const { data, status } = await authInstance.post('/refresh', { refresh });

  if (status === 500) {
    throw new Error('Internal server error');
  }

  return data;
}

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;

      try {
        const response = await refresh(localStorage.getItem('REFRESH_TOKEN') || '');

        localStorage.setItem('ACCESS_TOKEN', response.access);
        originalRequest.headers.Authorization = `Bearer ${response.access}`;

        return apiInstance(originalRequest);
      } catch (error) {
        window.location.pathname = '/auth'

        return Promise.reject(error);
      }
    }

    if (error.response.status === 403) {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('REFRESH_TOKEN');
      localStorage.removeItem('DESKTOP_TOKEN');

      window.location.pathname = '/auth';
    }

    if (error.response.status === 503) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
)