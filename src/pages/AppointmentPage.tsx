
import MainLayout from "@/components/Layout/MainLayout";
import AppointmentForm from "@/components/Appointment/AppointmentForm";

const AppointmentPage = () => {
  return (
    <MainLayout>
      <div className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-medical-900 mb-3">Book Your Appointment</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Schedule an appointment with our specialized doctors. Fill out the form below and we'll confirm your appointment shortly.
            </p>
          </div>
          <AppointmentForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default AppointmentPage;
