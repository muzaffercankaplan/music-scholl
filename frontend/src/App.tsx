//! Ant Design Imports
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, Spin } from "antd";
import { appTheme } from "./config/antConfigTheme";

//! Routes Imports
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { ProtectedRoute } from "./routes";

//! Context Imports
import { lazy, Suspense, useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import { AuthProvider, useAuth } from "./context";
import { setAccessToken } from "./lib/http";

//! Layout Imports
import { AppLayout, PublicLayout } from "./layouts";

//! Query Client Imports
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./lib/query";

//! Lazy Pages Imports
const Login = lazy(() => import("./pages/auth/Login"));

const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminLessons = lazy(() => import("./pages/admin/Lessons"));
const AdminReports = lazy(() => import("./pages/admin/Reports"));
const AdminRooms = lazy(() => import("./pages/admin/Rooms"));
const AdminStudentDetail = lazy(() => import("./pages/admin/StudentDetail"));
const AdminStudents = lazy(() => import("./pages/admin/Students"));
const AdminTeachers = lazy(() => import("./pages/admin/Teachers"));
const AdminUsers = lazy(() => import("./pages/admin/Users"));

const TeacherDashboard = lazy(() => import("./pages/teacher/Dashboard"));
const TeacherLessons = lazy(() => import("./pages/teacher/Lessons"));
const TeacherReports = lazy(() => import("./pages/teacher/Reports"));

function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <Navigate to={user.role === "admin" ? "/admin" : "/teacher"} replace />
  );
}

function AppRouter() {
  // AuthContext token değiştiğinde privateHttp için header güncelle
  const { token } = useAuth();
  useEffect(() => {
    setAccessToken(token ?? null);
  }, [token]);
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

  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <Spin size="large" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <ConfigProvider theme={appTheme}>
      <QueryClientProvider client={getQueryClient()}>
        <AuthProvider>
          {showSplash ? <SplashScreen /> : <AppRouter />}
        </AuthProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
}
