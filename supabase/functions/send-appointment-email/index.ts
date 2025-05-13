
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AppointmentEmailRequest {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  doctorName: string;
  departmentName: string;
  refNumber: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const appointmentData: AppointmentEmailRequest = await req.json();
    const { fullName, email, date, time, doctorName, departmentName, refNumber } = appointmentData;

    // Send email to patient
    const patientEmailResponse = await resend.emails.send({
      from: "Swasthya Saathi <onboarding@resend.dev>",
      to: [email],
      subject: "Your Appointment Confirmation - Swasthya Saathi",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <div style="background-color: #4A6FDC; padding: 15px; border-radius: 6px 6px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Appointment Confirmation</h1>
          </div>
          <div style="padding: 20px;">
            <p>Dear ${fullName},</p>
            <p>Your appointment has been successfully scheduled at Swasthya Saathi.</p>
            
            <div style="background-color: #f5f5f5; border-left: 4px solid #4A6FDC; padding: 15px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #4A6FDC;">Appointment Details</h3>
              <p style="margin: 5px 0;"><strong>Reference Number:</strong> ${refNumber}</p>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
              <p style="margin: 5px 0;"><strong>Time:</strong> ${time}</p>
              <p style="margin: 5px 0;"><strong>Department:</strong> ${departmentName}</p>
              <p style="margin: 5px 0;"><strong>Doctor:</strong> ${doctorName}</p>
            </div>
            
            <p>Please arrive 15 minutes before your appointment time. If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
            <p>Remember to bring:</p>
            <ul>
              <li>Photo identification</li>
              <li>Insurance card (if applicable)</li>
              <li>List of current medications</li>
              <li>Previous medical records (if relevant)</li>
            </ul>
            
            <p>If you have any questions, please contact our support team at support@swasthyasaathi.org or call us at +91 1234567890.</p>
            
            <p>Thank you for choosing Swasthya Saathi for your healthcare needs.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="font-size: 12px; color: #777;">
                This is an automated message, please do not reply to this email.
                If you did not request this appointment, please contact us immediately.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    // Send notification to hospital admin
    await resend.emails.send({
      from: "Swasthya Saathi <onboarding@resend.dev>",
      to: ["admin@swasthyasaathi.org"], // Replace with your admin email
      subject: "New Appointment Booking",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <div style="background-color: #4A6FDC; padding: 15px; border-radius: 6px 6px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Appointment Notification</h1>
          </div>
          <div style="padding: 20px;">
            <p>A new appointment has been scheduled:</p>
            
            <div style="background-color: #f5f5f5; border-left: 4px solid #4A6FDC; padding: 15px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #4A6FDC;">Appointment Details</h3>
              <p style="margin: 5px 0;"><strong>Reference Number:</strong> ${refNumber}</p>
              <p style="margin: 5px 0;"><strong>Patient:</strong> ${fullName}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
              <p style="margin: 5px 0;"><strong>Time:</strong> ${time}</p>
              <p style="margin: 5px 0;"><strong>Department:</strong> ${departmentName}</p>
              <p style="margin: 5px 0;"><strong>Doctor:</strong> ${doctorName}</p>
            </div>
            
            <p>Please update the appointment system accordingly.</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", patientEmailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-appointment-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
