import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-medical-800">Privacy Policy</h1>
            <Link
              to="/home"
              className="inline-flex items-center px-4 py-2 bg-medical-600 text-white rounded-md hover:bg-medical-700 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-medical-700 mb-3">1. Information We Collect</h2>
              <p className="mb-2">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal information (name, email address, phone number)</li>
                <li>Medical history and health information</li>
                <li>Appointment details and preferences</li>
                <li>Payment information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-medical-700 mb-3">2. How We Use Your Information</h2>
              <p className="mb-2">We use the collected information for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing healthcare services</li>
                <li>Managing appointments</li>
                <li>Processing payments</li>
                <li>Sending appointment reminders</li>
                <li>Improving our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-medical-700 mb-3">3. Information Sharing</h2>
              <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Healthcare providers involved in your care</li>
                <li>Insurance companies for billing purposes</li>
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-medical-700 mb-3">4. Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-medical-700 mb-3">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-medical-700 mb-3">6. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p className="mt-2">Email: debasmitfordev@gmail.com</p>
              <p>Phone: +91 1234567890</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-medical-700 mb-3">7. Updates to Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 