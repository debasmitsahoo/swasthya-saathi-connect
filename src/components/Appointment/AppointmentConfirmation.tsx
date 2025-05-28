import { format } from 'date-fns';
import { CheckCircle2, Printer } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import styles from './AppointmentConfirmation.module.css';

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
    <div className={styles.printContent}>
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className="text-2xl font-bold text-medical-500">
            Appointment Confirmation
          </CardTitle>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <div className="text-center mb-6">
            <div className={`text-4xl font-bold text-medical-500 mb-2 ${styles.referenceNumber}`}>
              {appointment.reference_number}
            </div>
            <p className="text-gray-500">Reference Number</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={styles.section}>
              <h3 className={`font-semibold mb-2 ${styles.sectionTitle}`}>Patient Information</h3>
              <div className={styles.infoRow}>{`${appointment.patient.first_name} ${appointment.patient.last_name}`}</div>
              <div className={styles.infoRow}>{appointment.patient.email}</div>
              <div className={styles.infoRow}>{appointment.patient.phone}</div>
            </div>

            <div className={styles.section}>
              <h3 className={`font-semibold mb-2 ${styles.sectionTitle}`}>Appointment Details</h3>
              <div className={styles.infoRow}><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</div>
              <div className={styles.infoRow}><strong>Time:</strong> {appointment.time}</div>
              <div className={styles.infoRow}><strong>Doctor:</strong> {appointment.doctor.name}</div>
              <div className={styles.infoRow}><strong>Specialization:</strong> {appointment.doctor.specialization}</div>
              <div className={styles.infoRow}><strong>Department:</strong> {appointment.department.name}</div>
            </div>
          </div>

          <div className={`bg-gray-50 p-4 rounded-lg ${styles.notes}`}>
            <h3 className={`font-semibold mb-2 ${styles.sectionTitle}`}>Important Notes</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Please arrive 15 minutes before your appointment time</li>
              <li>Bring your ID and insurance card (if applicable)</li>
              <li>Bring any relevant medical records or test results</li>
              <li>If you need to reschedule, please call us at least 24 hours in advance</li>
            </ul>
          </div>

          <div className={`text-center ${styles.noPrint}`}>
            <Button onClick={handlePrint} className="flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Print Confirmation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentConfirmation; 