import { jwtDecode } from "jwt-decode";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLoginMutation, type LoginParams } from "../services";
import type { AuthUser } from "../types/auth";

// types moved to src/types/auth

export type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  login: (params: LoginParams) => Promise<void>;
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

  const loginMutation = useLoginMutation();

  const login = async ({ email, password }: LoginParams) => {
    const { accessToken } = await loginMutation.mutateAsync({
      email,
      password,
    });
    setToken(accessToken);
    try {
      const claims = jwtDecode<{
        sub: string;
        name: string;
        role: "admin" | "teacher";
      }>(accessToken);
      const nextUser: AuthUser = {
        id: claims.sub,
        name: claims.name,
        role: claims.role,
      };
      setUser(nextUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } catch {
      // decode error: skip setting user from token
    }
    try {
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
