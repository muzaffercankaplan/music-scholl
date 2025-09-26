import axios, { AxiosError } from "axios";

export const http = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const message =
      (error.response?.data as any)?.message ||
      error.message ||
      "Request error";
    return Promise.reject({ status, message, original: error });
  }
);

export type HttpError = {
  status?: number;
  message: string;
  original?: unknown;
};
