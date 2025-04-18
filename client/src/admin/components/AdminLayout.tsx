import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  return (
    <div className="admin-layout flex flex-col gap-5">
        <AdminHeader />
        <Outlet />
    </div>
  );
};

export default AdminLayout;
