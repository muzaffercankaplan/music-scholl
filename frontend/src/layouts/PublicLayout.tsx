import { Outlet } from "react-router";

const PublicLayout = () => {
  return (
    <div className="max-w-sm mx-auto pt-12">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
