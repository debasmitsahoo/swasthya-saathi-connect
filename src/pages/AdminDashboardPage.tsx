
import AdminLayout from "@/components/Admin/Layout/AdminLayout";
import AdminDashboard from "@/components/Admin/Dashboard/AdminDashboard";
import { Toaster } from "@/components/ui/toaster";

const AdminDashboardPage = () => {
  return (
    <AdminLayout>
      <AdminDashboard />
      <Toaster />
    </AdminLayout>
  );
};

export default AdminDashboardPage;
