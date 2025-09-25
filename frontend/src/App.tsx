import "@ant-design/v5-patch-for-react-19";

import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AppLayout from "./layouts/AppLayout";
import PublicLayout from "./layouts/PublicLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLessons from "./pages/admin/Lessons";
import AdminReports from "./pages/admin/Reports";
import AdminRooms from "./pages/admin/Rooms";
import AdminStudentDetail from "./pages/admin/StudentDetail";
import AdminStudents from "./pages/admin/Students";
import AdminTeachers from "./pages/admin/Teachers";
import AdminUsers from "./pages/admin/Users";
import Login from "./pages/auth/Login";
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherLessons from "./pages/teacher/Lessons";
import TeacherReports from "./pages/teacher/Reports";
import { ProtectedRoute } from "./routes/ProtectedRoute";

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
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
