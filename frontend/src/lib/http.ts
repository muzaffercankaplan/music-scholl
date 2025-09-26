import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export const publicHttp = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const privateHttp = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

privateHttp.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>)[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }
  return config;
});

const normalizeError = (error: AxiosError) => {
  const status = error.response?.status;
  const message =
    (error.response?.data as any)?.message || error.message || "Request error";
  return Promise.reject({ status, message, original: error });
};

publicHttp.interceptors.response.use((r) => r, normalizeError);
privateHttp.interceptors.response.use((r) => r, normalizeError);

export type HttpError = {
  status?: number;
  message: string;
  original?: unknown;
};
