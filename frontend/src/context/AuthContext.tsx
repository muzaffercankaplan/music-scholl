import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { publicHttp } from "../lib/http";

export type UserRole = "admin" | "teacher";

export type AuthUser = {
  id: string;
  name: string;
  role: UserRole;
};

export type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  login: (params: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const STORAGE_KEY = "ms_auth_user";
  const TOKEN_KEY = "ms_access_token";

  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as AuthUser | null;
      return parsed ?? null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  });

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await publicHttp.post("/auth/login", { email, password });
    const { accessToken, user: apiUser } = res.data as {
      accessToken: string;
      user: AuthUser;
    };
    setUser(apiUser);
    setToken(accessToken);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(apiUser));
      localStorage.setItem(TOKEN_KEY, accessToken);
    } catch {
      // ignore storage write errors
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.clear();
    } catch {
      // ignore storage remove errors
    }
  };

  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
