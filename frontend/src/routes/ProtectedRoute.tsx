import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ allow }: { allow: "admin" | "teacher" }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== allow)
    return (
      <Navigate to={user.role === "admin" ? "/admin" : "/teacher"} replace />
    );
  return <Outlet />;
};

export const PublicOnlyRoute = () => {
  const { user } = useAuth();
  if (user)
    return (
      <Navigate to={user.role === "admin" ? "/admin" : "/teacher"} replace />
    );
  return <Outlet />;
};
