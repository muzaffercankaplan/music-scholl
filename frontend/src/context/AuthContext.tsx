import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type UserRole = "admin" | "teacher";

export type AuthUser = {
  id: string;
  name: string;
  role: UserRole;
};

export type AuthContextValue = {
  user: AuthUser | null;
  loginAs: (role: UserRole) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const STORAGE_KEY = "ms_auth_user";

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

  const loginAs = (role: UserRole) => {
    const next: AuthUser = {
      id: "demo",
      name: role === "admin" ? "Admin" : "Teacher",
      role,
    };
    setUser(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage write errors
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore storage remove errors
    }
  };

  const value = useMemo(() => ({ user, loginAs, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
