import { Icon } from "@iconify/react";
import { Link } from "react-router";

export const buildTeacherMenu = () => [
  {
    key: "/teacher",
    icon: (
      <Icon icon="material-symbols:dashboard-rounded" width={20} height={20} />
    ),
    label: <Link to="/teacher">Dashboard</Link>,
  },
  {
    key: "/teacher/lessons",
    icon: <Icon icon="solar:book-bold" width={20} height={20} />,
    label: <Link to="/teacher/lessons">Dersler</Link>,
  },
  {
    key: "/teacher/reports",
    icon: <Icon icon="mdi:chart-bar" width={20} height={20} />,
    label: <Link to="/teacher/reports">Raporlar</Link>,
  },
];

export const buildAdminMenu = () => [
  {
    key: "/admin",
    icon: (
      <Icon icon="material-symbols:dashboard-rounded" width={20} height={20} />
    ),
    label: <Link to="/admin">Dashboard</Link>,
  },
  {
    key: "/admin/students",
    icon: <Icon icon="mdi:account-school" width={20} height={20} />,
    label: <Link to="/admin/students">Öğrenciler</Link>,
  },
  {
    key: "/admin/teachers",
    icon: <Icon icon="mdi:account-tie" width={20} height={20} />,
    label: <Link to="/admin/teachers">Öğretmenler</Link>,
  },
  {
    key: "/admin/rooms",
    icon: <Icon icon="mdi:door" width={20} height={20} />,
    label: <Link to="/admin/rooms">Odalar</Link>,
  },
  {
    key: "/admin/lessons",
    icon: <Icon icon="mdi:book-open-variant" width={20} height={20} />,
    label: <Link to="/admin/lessons">Dersler</Link>,
  },
  {
    key: "/admin/reports",
    icon: <Icon icon="mdi:chart-bar" width={20} height={20} />,
    label: <Link to="/admin/reports">Raporlar</Link>,
  },
  {
    key: "/admin/users",
    icon: <Icon icon="mdi:account-key" width={20} height={20} />,
    label: <Link to="/admin/users">Kullanıcılar</Link>,
  },
];

export const breadcrumbNameMap: Record<string, string> = {
  "/admin/students": "Öğrenciler",
  "/admin/teachers": "Öğretmenler",
  "/admin/rooms": "Odalar",
  "/admin/lessons": "Dersler",
  "/admin/reports": "Raporlar",
  "/admin/users": "Kullanıcılar",
  "/teacher/lessons": "Dersler",
  "/teacher/reports": "Raporlar",
};

export const computeSelectedKey = (
  pathname: string,
  menuItems: { key?: string }[]
) => {
  const candidates = menuItems.filter(
    (i) =>
      !!i.key &&
      (pathname === i.key || pathname.startsWith((i.key as string) + "/"))
  );
  if (candidates.length === 0) return "";
  return candidates.sort(
    (a, b) => (b.key?.length || 0) - (a.key?.length || 0)
  )[0]!.key as string;
};
