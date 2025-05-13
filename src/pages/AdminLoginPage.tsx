
import MainLayout from "@/components/Layout/MainLayout";
import AdminLogin from "@/components/Admin/AdminLogin";

const AdminLoginPage = () => {
  return (
    <MainLayout hideFooter>
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-medical-900 mb-3">Admin Login</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Access the hospital management system with your administrative credentials.
            </p>
          </div>
          <AdminLogin />
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminLoginPage;
