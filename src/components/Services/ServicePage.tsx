
import { useParams } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const serviceData = {
  "general-consultation": {
    title: "General Consultation",
    description: "Our expert physicians provide comprehensive general health consultations for patients of all ages.",
    content: "Our general consultation service offers comprehensive health assessments for patients of all ages. Our experienced doctors take the time to listen to your concerns, review your medical history, and provide personalized advice and treatment plans. Whether you're dealing with a common illness, need a routine check-up, or require ongoing management of a chronic condition, our general practitioners are here to help you achieve optimal health.",
    icon: (
      <svg className="w-16 h-16 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
      </svg>
    ),
    benefits: [
      "Comprehensive health assessments",
      "Personalized treatment plans",
      "Preventive healthcare advice",
      "Management of chronic conditions",
      "Referrals to specialists when needed"
    ]
  },
  "emergency": {
    title: "Emergency Services",
    description: "24/7 emergency care for life-threatening conditions with rapid response and expert medical intervention.",
    content: "Our emergency department is equipped to handle all types of medical emergencies, from minor injuries to life-threatening conditions. Our team of emergency medicine specialists, nurses, and support staff work together to provide prompt, efficient care when you need it most. We use the latest medical technologies and follow standardized protocols to ensure the best possible outcomes for our patients.",
    icon: (
      <svg className="w-16 h-16 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
      </svg>
    ),
    benefits: [
      "24/7 availability",
      "State-of-the-art emergency equipment",
      "Experienced trauma teams",
      "Rapid assessment and treatment",
      "Seamless hospital admission when necessary"
    ]
  },
  "laboratory": {
    title: "Laboratory Tests",
    description: "Advanced diagnostic laboratory services with quick, accurate results for informed medical decisions.",
    content: "Our state-of-the-art laboratory offers a wide range of diagnostic tests to help identify and monitor various medical conditions. From routine blood work to specialized genetic testing, our lab technicians use advanced equipment and techniques to provide accurate, reliable results in a timely manner. Our laboratory is accredited by national regulatory bodies, ensuring the highest standards of quality and precision.",
    icon: (
      <svg className="w-16 h-16 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    ),
    benefits: [
      "Comprehensive test menu",
      "Quick turnaround times",
      "Highly accurate results",
      "Online result delivery",
      "Expert interpretation and consultation"
    ]
  },
  "specialist": {
    title: "Specialist Consultations",
    description: "Access to expert specialists across various medical fields providing advanced, specialized care.",
    content: "Our hospital features a diverse team of specialists who are leaders in their respective fields. Whether you need a cardiologist, neurologist, orthopedic surgeon, or any other specialist, we can connect you with the right expert for your specific health concerns. Our specialists work collaboratively with your primary care physician to ensure comprehensive, coordinated care that addresses all aspects of your health.",
    icon: (
      <svg className="w-16 h-16 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>
    ),
    benefits: [
      "Access to renowned specialists",
      "Multi-disciplinary approach",
      "Advanced treatment options",
      "Collaborative care with primary physicians",
      "Specialized follow-up care"
    ]
  },
  "pharmacy": {
    title: "Pharmacy Services",
    description: "Comprehensive pharmacy services with prescription filling, medication management, and expert pharmaceutical advice.",
    content: "Our in-house pharmacy provides convenient access to prescription medications, over-the-counter products, and pharmaceutical expertise. Our licensed pharmacists are available to answer your questions about medications, potential interactions, and proper usage. We also offer medication management services to help patients with multiple prescriptions stay on track with their treatment plans.",
    icon: (
      <svg className="w-16 h-16 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path>
      </svg>
    ),
    benefits: [
      "Convenient prescription filling",
      "Medication counseling",
      "Automatic refill services",
      "Comprehensive medication reviews",
      "Home delivery options"
    ]
  }
};

const ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceData[serviceId as keyof typeof serviceData];
  
  if (!service) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-center">Service not found</h1>
          <div className="text-center mt-8">
            <Link to="/home#services">
              <Button>Return to Services</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-medical-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="bg-white p-5 rounded-full shadow-lg">
                {service.icon}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-medical-900 text-center mb-6">
              {service.title}
            </h1>
            
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              {service.description}
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-medical-800 mb-4">About This Service</h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                {service.content}
              </p>
              
              <h3 className="text-xl font-semibold text-medical-800 mb-3">Key Benefits</h3>
              <ul className="space-y-2 mb-8">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-medical-500 mr-2">•</span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/appointment">
                  <Button className="bg-medical-600 hover:bg-medical-700 text-white px-8 py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto">
                    Book an Appointment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="px-8 py-6 rounded-lg border-medical-500 text-medical-600 hover:bg-medical-50 transition-all duration-300 w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="text-center">
              <Link to="/home#services" className="text-medical-600 hover:text-medical-800 font-medium transition-colors duration-300 flex items-center justify-center gap-2 group">
                <span className="group-hover:underline">View All Services</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServicePage;
