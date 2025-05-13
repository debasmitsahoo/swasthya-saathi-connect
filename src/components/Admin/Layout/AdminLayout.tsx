
import { ReactNode } from "react";
import Sidebar from "../Dashboard/Sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto bg-gray-50">{children}</div>
    </div>
  );
};

export default AdminLayout;
