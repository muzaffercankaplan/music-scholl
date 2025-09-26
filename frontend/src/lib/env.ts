export const ENV = {
  apiBaseUrl:
    (import.meta as any).env?.VITE_API_BASE_URL ||
    (typeof window !== "undefined" ? (window as any).__API_BASE_URL__ : "") ||
    "/api",
};
