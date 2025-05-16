
import AdminLayout from "@/components/Admin/Layout/AdminLayout";
import AdminDashboard from "@/components/Admin/Dashboard/AdminDashboard";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboardPage = () => {
  useEffect(() => {
    // Verify database connection on component mount
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.from("patients").select("count()", { count: 'exact', head: true });
        if (error) {
          console.error("Database connection error:", error);
        } else {
          console.log("Database connected successfully, patient count:", data);
        }
      } catch (err) {
        console.error("Error connecting to database:", err);
      }
    };

    checkConnection();
  }, []);

  return (
    <AdminLayout>
      <AdminDashboard />
      <Toaster />
    </AdminLayout>
  );
};

export default AdminDashboardPage;
