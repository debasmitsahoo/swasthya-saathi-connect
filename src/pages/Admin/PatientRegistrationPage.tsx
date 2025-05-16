
import AdminLayout from "@/components/Admin/Layout/AdminLayout";
import PatientForm from "@/components/Admin/Patients/PatientForm";
import { Toaster } from "@/components/ui/toaster";

const PatientRegistrationPage = () => {
  return (
    <AdminLayout>
      <div className="flex flex-1 flex-col space-y-6 p-4 md:p-6">
        <h1 className="text-3xl font-bold">Patient Registration</h1>
        <p className="text-muted-foreground">Register new patients in the system</p>
        <PatientForm />
      </div>
      <Toaster />
    </AdminLayout>
  );
};

export default PatientRegistrationPage;
