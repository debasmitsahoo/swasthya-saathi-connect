
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
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
    icon: (
      <svg className="w-12 h-12 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </svg>
    ),
    title: "Cardiology",
    description:
      "Specialized care for heart conditions including diagnostics, treatment, and preventive care.",
  },
  {
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
    icon: (
      <svg className="w-12 h-12 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
      </svg>
    ),
    title: "Surgery",
    description:
      "Expert surgical care with state-of-the-art facilities and experienced surgeons across specialties.",
  },
];

const Services = () => {
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
        card.classList.add(`staggered-enter-${index}`);
        observer.observe(card);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white" id="services">
      <div className="container mx-auto px-4" ref={sectionRef}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-medical-900 mb-4">
            Our Medical Services
          </h2>
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
                <CardTitle className="text-xl text-medical-800 group-hover:text-medical-600 transition-colors duration-300">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            className="bg-medical-600 hover:bg-medical-700 text-white px-10 py-7 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
          >
            <span className="relative z-10">View All Services</span>
            <span className="absolute inset-0 bg-gradient-to-r from-medical-500 to-medical-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
