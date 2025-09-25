import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({
  allow,
}: {
  allow: "admin" | "teacher" | "both";
}) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allow === "both") return <Outlet />;
  if (user.role !== allow)
    return (
      <Navigate to={user.role === "admin" ? "/admin" : "/teacher"} replace />
    );
  return <Outlet />;
};
