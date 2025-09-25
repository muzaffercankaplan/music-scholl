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
  const [user, setUser] = useState<AuthUser | null>(null);

  const loginAs = (role: UserRole) => {
    setUser({ id: "demo", name: role === "admin" ? "Admin" : "Teacher", role });
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, loginAs, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
