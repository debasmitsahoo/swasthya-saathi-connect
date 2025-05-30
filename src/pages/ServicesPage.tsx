import { Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";

const services = [
  {
    id: "general-consultation",
    icon: (
      <svg className="w-12 h-12 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
      </svg>
    ),
    title: "General Consultation",
    description:
      "Our expert physicians provide comprehensive general health consultations for patients of all ages.",
  },
  {
    id: "laboratory",
    icon: (
      <svg className="w-12 h-12 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    ),
    title: "Laboratory Services",
    description:
      "Advanced diagnostic laboratory services with quick, accurate results for informed medical decisions.",
  },
  {
    id: "emergency",
    icon: (
      <svg className="w-12 h-12 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
      </svg>
    ),
    title: "Emergency Services",
    description:
      "24/7 emergency care for life-threatening conditions with rapid response and expert medical intervention.",
  },
  {
    id: "specialist",
    icon: (
      <svg className="w-12 h-12 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>
    ),
    title: "Specialist Consultations",
    description:
      "Access to expert specialists across various medical fields providing advanced, specialized care.",
  },
  {
    id: "pharmacy",
    icon: (
      <svg className="w-12 h-12 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path>
      </svg>
    ),
    title: "Pharmacy Services",
    description:
      "Comprehensive pharmacy services with prescription filling, medication management, and expert pharmaceutical advice.",
  }
];

const ServicesPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".service-card");
      cards.forEach((card, index) => {
        card.classList.add(`staggered-item`);
        card.classList.add(`staggered-enter-${index % 4}`);
        observer.observe(card);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-medical-50 to-white py-16">
        <div className="container mx-auto px-4" ref={sectionRef}>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-medical-900 mb-4">
              Our Medical Services
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Providing comprehensive healthcare services with cutting-edge technology and experienced medical professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" ref={cardsRef}>
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="service-card border-none shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                <CardHeader className="pb-2">
                  <div className="bg-medical-50 rounded-2xl p-4 w-fit mb-4 group-hover:bg-medical-100 transition-colors duration-300 transform group-hover:scale-110">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl text-medical-800 group-hover:text-medical-600 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 mb-4">
                    {service.description}
                  </CardDescription>
                  <Link to={`/services/${service.id}`}>
                    <Button 
                      variant="outline" 
                      className="w-full mt-2 border-medical-300 text-medical-600 hover:bg-medical-50 hover:text-medical-700 transition-all duration-300"
                    >
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/appointment">
              <Button 
                className="bg-medical-600 hover:bg-medical-700 text-white px-10 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
              >
                <span className="relative z-10">Book an Appointment</span>
                <span className="absolute inset-0 bg-gradient-to-r from-medical-500 to-medical-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServicesPage;
