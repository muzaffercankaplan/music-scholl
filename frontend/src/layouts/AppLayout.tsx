import { Button, Layout, Menu, Typography } from "antd";
import { Link, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

const { Header, Content } = Layout;

const AppLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const teacherItems = [
    { key: "/teacher", label: <Link to="/teacher">Dashboard</Link> },
    {
      key: "/teacher/lessons",
      label: <Link to="/teacher/lessons">Dersler</Link>,
    },
    {
      key: "/teacher/reports",
      label: <Link to="/teacher/reports">Raporlar</Link>,
    },
  ];

  const adminItems = [
    { key: "/admin", label: <Link to="/admin">Dashboard</Link> },
    {
      key: "/admin/students",
      label: <Link to="/admin/students">Öğrenciler</Link>,
    },
    {
      key: "/admin/teachers",
      label: <Link to="/admin/teachers">Öğretmenler</Link>,
    },
    { key: "/admin/rooms", label: <Link to="/admin/rooms">Odalar</Link> },
    { key: "/admin/lessons", label: <Link to="/admin/lessons">Dersler</Link> },
    { key: "/admin/reports", label: <Link to="/admin/reports">Raporlar</Link> },
    { key: "/admin/users", label: <Link to="/admin/users">Kullanıcılar</Link> },
  ];

  const items = user?.role === "admin" ? adminItems : teacherItems;

  const selectedKey = (() => {
    const path = location.pathname;
    // Prefer exact matches; otherwise choose the longest matching prefix
    const candidates = items.filter(
      (i) => path === i.key || path.startsWith(i.key + "/")
    );
    if (candidates.length === 0) return "";
    return candidates.sort((a, b) => b.key.length - a.key.length)[0]!.key;
  })();

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between gap-4 px-6">
        <Typography.Title level={4} className="!text-white !m-0">
          Lavita
        </Typography.Title>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={items}
          className="flex-1 min-w-0 ml-4"
        />
        {user && (
          <Button ghost onClick={logout}>
            Çıkış
          </Button>
        )}
      </Header>
      <Content className="p-6 min-h-[calc(100vh-64px)]">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppLayout;
