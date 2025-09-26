//! Ant Design Imports
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import { appTheme } from "./config/antConfigTheme";

//! Routes Imports
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { ProtectedRoute } from "./routes";

//! Context Imports
import { AuthProvider, useAuth } from "./context";

//! Layout Imports
import { AppLayout, PublicLayout } from "./layouts";

//! Query Client Imports
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./lib/query";

//! Admin Pages Imports
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

//! Auth Pages Imports
import { Login } from "./pages/auth";

//! Teacher Pages Imports
import {
  TeacherDashboard,
  TeacherLessons,
  TeacherReports,
} from "./pages/teacher";

function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <Navigate to={user.role === "admin" ? "/admin" : "/teacher"} replace />
  );
}

function AppRouter() {
  const router = createBrowserRouter([
    // Public area (PublicLayout internally redirects if authenticated)
    {
      element: <PublicLayout />,
      children: [{ path: "/login", element: <Login /> }],
    },
    // Teacher protected area (AppLayout only renders if authorized)
    {
      element: <ProtectedRoute allow="teacher" />,
      children: [
        {
          element: <AppLayout />,
          children: [
            { path: "/teacher", element: <TeacherDashboard /> },
            { path: "/teacher/lessons", element: <TeacherLessons /> },
            { path: "/teacher/reports", element: <TeacherReports /> },
          ],
        },
      ],
    },
    // Admin protected area (AppLayout only renders if authorized)
    {
      element: <ProtectedRoute allow="admin" />,
      children: [
        {
          element: <AppLayout />,
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
      ],
    },
    { path: "/", element: <RootRedirect /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <ConfigProvider theme={appTheme}>
      <QueryClientProvider client={getQueryClient()}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
}
