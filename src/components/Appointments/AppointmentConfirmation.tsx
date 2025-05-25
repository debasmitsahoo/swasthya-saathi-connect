import { useLocation, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download } from "lucide-react";
import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

interface AppointmentDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  departmentName: string;
  doctorName: string;
  refNumber: string;
  notes?: string;
}

const AppointmentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointment = location.state as AppointmentDetails;
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!cardRef.current) return;

    try {
      // Show loading state
      toast.loading('Generating PDF...');

      // Create a clone of the card to avoid any styling issues
      const cardClone = cardRef.current.cloneNode(true) as HTMLElement;
      document.body.appendChild(cardClone);
      cardClone.style.position = 'absolute';
      cardClone.style.left = '-9999px';
      cardClone.style.width = '800px'; // Fixed width for better quality

      // Generate the PDF
      const canvas = await html2canvas(cardClone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 800,
        windowHeight: cardClone.scrollHeight,
      });

      // Remove the clone
      document.body.removeChild(cardClone);

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      // Add the image to PDF
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Save the PDF
      pdf.save(`appointment-confirmation-${appointment.refNumber}.pdf`);
      
      // Show success message
      toast.dismiss();
      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.dismiss();
      toast.error('Failed to download PDF. Please try again.');
    }
  };

  if (!appointment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-2">No Appointment Details</h1>
        <p className="text-gray-600 mb-4">Please book an appointment first.</p>
        <Button onClick={() => navigate('/')}>Return Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto" ref={cardRef}>
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-center text-2xl">Appointment Confirmed!</CardTitle>
          <CardDescription className="text-center">
            Your appointment has been successfully scheduled
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">First Name</p>
                <p className="text-lg">{appointment.firstName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Last Name</p>
                <p className="text-lg">{appointment.lastName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg">{appointment.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-lg">{appointment.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Doctor</p>
                <p className="text-lg">{appointment.doctorName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Department</p>
                <p className="text-lg">{appointment.departmentName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-lg">{appointment.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Time</p>
                <p className="text-lg">{appointment.time}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Reference Number</p>
                <p className="text-lg">{appointment.refNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="text-lg">Scheduled</p>
              </div>
            </div>
            {appointment.notes && (
              <div>
                <p className="text-sm font-medium text-gray-500">Notes</p>
                <p className="text-lg">{appointment.notes}</p>
              </div>
            )}
            <div className="flex justify-center gap-4 mt-6">
              <Button variant="outline" onClick={() => navigate('/')}>
                Return Home
              </Button>
              <Button onClick={() => window.print()}>
                Print Confirmation
              </Button>
              <Button 
                onClick={downloadPDF} 
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentConfirmation; 