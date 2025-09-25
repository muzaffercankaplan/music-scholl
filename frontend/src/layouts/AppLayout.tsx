import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { Breadcrumb, Button, Drawer, Grid, Layout, Menu } from "antd";
import { useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { useAuth } from "../context";
import {
  breadcrumbNameMap,
  buildAdminMenu,
  buildTeacherMenu,
  computeSelectedKey,
} from "./config";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const AppLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const screens = useBreakpoint();
  const isLgUp = screens.lg;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const menuItems =
    user?.role === "admin" ? buildAdminMenu() : buildTeacherMenu();

  const selectedKey = useMemo(
    () => computeSelectedKey(location.pathname, menuItems),
    [location.pathname, menuItems]
  );

  const SiderInner = (
    <div className="h-full flex flex-col">
      <div
        className={`flex items-center justify-between gap-2 h-16 ${
          isLgUp ? "px-6 " : "px-0"
        }`}
      >
        <div className="flex items-center gap-2">
          <Icon icon="mdi:music" width={24} height={24} />
          {!collapsed && <span className="font-semibold">Lavita</span>}
        </div>
        {!isLgUp && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMobileOpen(false)}
            aria-label="Menüyü kapat"
          />
        )}
      </div>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={() => setMobileOpen(false)}
        style={{ borderRight: 0, flex: 1 }}
      />
      {user && (
        <div className="p-3">
          <Button block icon={<LogoutOutlined />} onClick={logout}>
            {!collapsed && "Çıkış"}
          </Button>
        </div>
      )}
    </div>
  );

  // Breadcrumb items for AntD
  const pathSnippets = location.pathname.split("/").filter(Boolean);
  const breadcrumbItems = [
    {
      title: (
        <Link to={user?.role === "admin" ? "/admin" : "/teacher"}>
          Anasayfa
        </Link>
      ),
    },
    ...(pathSnippets
      .map((_, idx) => {
        const url = `/${pathSnippets.slice(0, idx + 1).join("/")}`;
        const name = breadcrumbNameMap[url];
        if (!name) return null;
        return {
          title:
            idx === pathSnippets.length - 1 ? (
              <span>{name}</span>
            ) : (
              <Link to={url}>{name}</Link>
            ),
        };
      })
      .filter(Boolean) as { title: React.ReactNode }[]),
  ];

  return (
    <Layout className="min-h-screen h-screen">
      {isLgUp ? (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(v) => setCollapsed(v)}
          trigger={null}
          breakpoint="lg"
          collapsedWidth={64}
          width={220}
          theme="light"
          style={{ position: "sticky", top: 0, height: "100vh" }}
        >
          {SiderInner}
        </Sider>
      ) : (
        <>
          <div className="h-12 px-3 flex items-center gap-2 border-b border-gray-200 bg-white">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileOpen(true)}
            />
            <Icon icon="mdi:music" width={22} height={22} />
            <span className="font-semibold">Lavita</span>
          </div>
          <Drawer
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            placement="left"
            width={260}
            closeIcon={null}
          >
            <div className="h-full bg-white">{SiderInner}</div>
          </Drawer>
        </>
      )}

      <Content className="p-0 h-full w-full bg-gray-50">
        <div className="flex items-center gap-3 px-6 py-3 border-b border-gray-200 bg-white sticky top-0 z-10">
          {isLgUp && (
            <Button
              type="text"
              onClick={() => setCollapsed((v) => !v)}
              aria-label="Menüyü daralt/aç"
            >
              <Icon
                icon={collapsed ? "mdi:menu-open" : "mdi:menu"}
                width={20}
                height={20}
              />
            </Button>
          )}
          <Breadcrumb separator=">" items={breadcrumbItems} />
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default AppLayout;
