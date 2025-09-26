import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context";

const PublicLayout = () => {
  const { user } = useAuth();
  if (user)
    return (
      <Navigate to={user.role === "admin" ? "/admin" : "/teacher"} replace />
    );
  return (
    <div className="max-w-sm mx-auto pt-12">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
