import { ConfigProvider } from "antd";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { appTheme } from "./config/antConfigTheme";
import { AuthProvider, useAuth } from "./context";
import { AppLayout, PublicLayout } from "./layouts";
import {
  AdminDashboard,
  AdminLessons,
  AdminReports,
  AdminRooms,
  AdminStudentDetail,
  AdminStudents,
  AdminTeachers,
  AdminUsers,
} from "./pages/admin";
import { Login } from "./pages/auth";
import {
  TeacherDashboard,
  TeacherLessons,
  TeacherReports,
} from "./pages/teacher";
import { ProtectedRoute } from "./routes";

function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <Navigate to={user.role === "admin" ? "/admin" : "/teacher"} replace />
  );
}

function AppRouter() {
  const router = createBrowserRouter([
    {
      element: <PublicLayout />,
      children: [{ path: "/login", element: <Login /> }],
    },
    {
      element: <AppLayout />,
      children: [
        {
          element: <ProtectedRoute allow="teacher" />,
          children: [
            { path: "/teacher", element: <TeacherDashboard /> },
            { path: "/teacher/lessons", element: <TeacherLessons /> },
            { path: "/teacher/reports", element: <TeacherReports /> },
          ],
        },
        {
          element: <ProtectedRoute allow="admin" />,
          children: [
            { path: "/admin", element: <AdminDashboard /> },
            { path: "/admin/students", element: <AdminStudents /> },
            { path: "/admin/students/:id", element: <AdminStudentDetail /> },
            { path: "/admin/teachers", element: <AdminTeachers /> },
            { path: "/admin/rooms", element: <AdminRooms /> },
            { path: "/admin/lessons", element: <AdminLessons /> },
            { path: "/admin/reports", element: <AdminReports /> },
            { path: "/admin/users", element: <AdminUsers /> },
          ],
        },
        { path: "/", element: <RootRedirect /> },
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <ConfigProvider theme={appTheme}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ConfigProvider>
  );
}
