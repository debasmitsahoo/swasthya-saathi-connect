import { format } from 'date-fns';
import { CheckCircle2, Printer } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface AppointmentConfirmationProps {
  appointment: {
    reference_number: string;
    date: string;
    time: string;
    status: string;
    notes?: string;
    patient: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
    };
    doctor: {
      name: string;
      specialization: string;
    };
    department: {
      name: string;
    };
  };
}

const AppointmentConfirmation = ({ appointment }: AppointmentConfirmationProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print-specific styles */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-content, .print-content * {
              visibility: visible;
            }
            .print-content {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 20px;
            }
            .print-content .card {
              border: none !important;
              box-shadow: none !important;
            }
            .print-content .card-header {
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
            .print-content .card-content {
              padding: 0;
            }
            .print-content .reference-number {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .print-content .section {
              margin-bottom: 20px;
            }
            .print-content .section-title {
              font-weight: bold;
              margin-bottom: 10px;
              border-bottom: 1px solid #ccc;
              padding-bottom: 5px;
            }
            .print-content .info-row {
              margin-bottom: 5px;
            }
            .print-content .notes {
              margin-top: 20px;
              font-size: 12px;
            }
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      <div className="print-content">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-medical-500">
              Appointment Confirmation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-medical-500 mb-2 reference-number">
                {appointment.reference_number}
              </div>
              <p className="text-gray-500">Reference Number</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="section">
                <h3 className="font-semibold mb-2 section-title">Patient Information</h3>
                <div className="info-row">{`${appointment.patient.first_name} ${appointment.patient.last_name}`}</div>
                <div className="info-row">{appointment.patient.email}</div>
                <div className="info-row">{appointment.patient.phone}</div>
              </div>

              <div className="section">
                <h3 className="font-semibold mb-2 section-title">Appointment Details</h3>
                <div className="info-row"><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</div>
                <div className="info-row"><strong>Time:</strong> {appointment.time}</div>
                <div className="info-row"><strong>Doctor:</strong> {appointment.doctor.name}</div>
                <div className="info-row"><strong>Specialization:</strong> {appointment.doctor.specialization}</div>
                <div className="info-row"><strong>Department:</strong> {appointment.department.name}</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg notes">
              <h3 className="font-semibold mb-2 section-title">Important Notes</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Please arrive 15 minutes before your appointment time</li>
                <li>Bring your ID and insurance card (if applicable)</li>
                <li>Bring any relevant medical records or test results</li>
                <li>If you need to reschedule, please call us at least 24 hours in advance</li>
              </ul>
            </div>

            <div className="text-center no-print">
              <Button onClick={handlePrint} className="flex items-center gap-2">
                <Printer className="w-4 h-4" />
                Print Confirmation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AppointmentConfirmation; 