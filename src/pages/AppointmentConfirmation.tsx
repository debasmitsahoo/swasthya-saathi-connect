
import MainLayout from "@/components/Layout/MainLayout";
import ConfirmationPage from "@/components/Appointment/ConfirmationPage";

const AppointmentConfirmation = () => {
  return (
    <MainLayout>
      <div className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-medical-900 mb-3">Appointment Confirmed</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Thank you for booking with Swasthya Saathi. Below are the details of your appointment.
            </p>
          </div>
          <ConfirmationPage />
        </div>
      </div>
    </MainLayout>
  );
};

export default AppointmentConfirmation;
