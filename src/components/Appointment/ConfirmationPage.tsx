import { useLocation, Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

const ConfirmationPage = () => {
  const location = useLocation();
  const appointmentData = location.state;
  const cardRef = useRef<HTMLDivElement>(null);
  
  // If user directly navigates to confirmation page without data, redirect to appointment page
  if (!appointmentData) {
    return <Navigate to="/appointment" />;
  }

  const {
    fullName,
    email,
    phone,
    gender,
    date,
    time,
    departmentName,
    doctorName,
    refNumber
  } = appointmentData;

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
      cardClone.style.width = '595px'; // A4 width in pixels at 72 DPI
      cardClone.style.padding = '40px'; // Add padding for better margins

      // Generate the PDF
      const canvas = await html2canvas(cardClone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 595, // A4 width
        windowHeight: cardClone.scrollHeight,
      });

      // Remove the clone
      document.body.removeChild(cardClone);

      // Create PDF in A4 format
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt', // Use points for better precision
        format: 'a4',
      });

      // Calculate scaling to fit A4
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add the image to PDF
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        imgWidth,
        imgHeight
      );

      // Save the PDF
      pdf.save(`appointment-confirmation-${refNumber}.pdf`);
      
      // Show success message
      toast.dismiss();
      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.dismiss();
      toast.error('Failed to download PDF. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div 
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 flex items-center">
          <div className="bg-white/20 rounded-full p-3">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div className="ml-4 text-white">
            <h2 className="text-2xl font-bold">Appointment Confirmed!</h2>
            <p className="opacity-90">Your appointment has been successfully scheduled</p>
          </div>
        </div>
        
        <div className="p-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200"
          >
            <div className="mb-2 text-gray-500">Appointment Reference</div>
            <div className="text-2xl font-semibold text-gray-800 flex items-center">
              {refNumber}
              <div className="ml-2 bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded">
                Confirmed
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-1">Please save this reference number for future inquiries</div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="space-y-4"
            >
              <div>
                <h3 className="text-sm font-medium text-gray-500">Patient Information</h3>
                <div className="mt-2">
                  <p className="text-gray-800 font-medium">{fullName}</p>
                  <p className="text-gray-600">{email}</p>
                  <p className="text-gray-600">{phone}</p>
                  <p className="text-gray-600">Gender: {gender}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Doctor</h3>
                <p className="text-gray-800">{doctorName}</p>
                <p className="text-gray-600">{departmentName}</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <h3 className="text-sm font-medium text-gray-500">Appointment Schedule</h3>
              <div className="mt-2 flex items-start space-x-3">
                <div className="bg-medical-100 p-2 rounded">
                  <svg className="w-5 h-5 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-800">{format(new Date(date), "EEEE, MMMM d, yyyy")}</div>
                  <div className="text-gray-600">{time}</div>
                </div>
              </div>
              
              <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex">
                  <div className="text-blue-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-800">Please arrive 15 minutes early</h4>
                    <div className="mt-1 text-sm text-blue-700">
                      Please bring any relevant medical records or reports to your appointment.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <Link to="/">
              <Button variant="outline" className="w-full sm:w-auto border-medical-600 text-medical-700">
                Return to Home
              </Button>
            </Link>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={downloadPDF}
                className="bg-medical-600 hover:bg-medical-700 w-full sm:w-auto"
              >
                Download Confirmation
              </Button>
              <Button variant="outline" className="border-medical-600 text-medical-700 w-full sm:w-auto">
                Add to Calendar
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;
