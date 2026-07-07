import axios, { InternalAxiosRequestConfig } from "axios";
import { serverConstants } from "./server-constant";

const publicApi = axios.create({
  baseURL: serverConstants.authenticationUrl,
});

const secureApi = axios.create({
  baseURL: serverConstants.authenticationUrl,
});

const addAuthToken = (config: InternalAxiosRequestConfig) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token && config.headers && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const addLoggingInterceptor = (instance: any, name: string) => {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    addAuthToken(config);
    return config;
  });
  instance.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (error: any) => {
      if (error.response?.status === 401) {
        const requestUrl = error.config?.url || "";
        const isAuthEndpoint = requestUrl.includes("/auth/");
        if (!isAuthEndpoint && typeof window !== "undefined") {
          console.error(`[API 401] Unauthorized redirect from: ${requestUrl}`);
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      }
      return Promise.reject(error);
    },
  );
};

addLoggingInterceptor(publicApi, "PUBLIC");
addLoggingInterceptor(secureApi, "SECURE");

export { publicApi, secureApi };
