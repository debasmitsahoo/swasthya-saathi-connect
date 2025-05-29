import React from 'react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-medical-800 mb-6">Terms and Conditions</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-medical-700 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using Swasthya Saathi Hospital Management System, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-medical-700 mb-3">2. Use of Services</h2>
              <p className="mb-2">Our services are intended for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Booking medical appointments</li>
                <li>Accessing healthcare services</li>
                <li>Managing medical records</li>
                <li>Communicating with healthcare providers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-medical-700 mb-3">3. User Responsibilities</h2>
              <p>As a user, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of your account</li>
                <li>Use the services in compliance with applicable laws</li>
                <li>Notify us of any unauthorized access to your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-medical-700 mb-3">4. Medical Disclaimer</h2>
              <p>Our services are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers for any medical concerns.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-medical-700 mb-3">5. Payment Terms</h2>
              <p className="mb-2">Payment terms include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All fees are due at the time of service</li>
                <li>We accept various payment methods</li>
                <li>Refunds are subject to our refund policy</li>
                <li>Insurance claims are processed according to your policy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-medical-700 mb-3">6. Cancellation Policy</h2>
              <p>Appointments must be cancelled at least 24 hours in advance. Late cancellations may be subject to a cancellation fee.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-medical-700 mb-3">7. Intellectual Property</h2>
              <p>All content, including text, graphics, logos, and software, is the property of Swasthya Saathi and is protected by intellectual property laws.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-medical-700 mb-3">8. Limitation of Liability</h2>
              <p>Swasthya Saathi shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-medical-700 mb-3">9. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-medical-700 mb-3">10. Contact Information</h2>
              <p>For questions about these Terms and Conditions, please contact us at:</p>
              <p className="mt-2">Email: debasmitfordev@gmail.com</p>
              <p>Phone: +91 1234567890</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions; 