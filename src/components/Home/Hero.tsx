
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const elementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (elementsRef.current) {
      const elements = elementsRef.current.querySelectorAll(".staggered-item");
      elements.forEach((el) => {
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-white via-blue-50 to-medical-100 pt-28 pb-20 md:pb-16 md:pt-36 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-medical-200 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-medical-300 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10 relative" ref={elementsRef}>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 mb-10 md:mb-0">
            <h1 className="staggered-item staggered-enter-0 text-4xl md:text-5xl lg:text-6xl font-bold text-medical-900 leading-tight">
              Quality Healthcare for <span className="text-medical-600">Everyone</span>
            </h1>
            
            <p className="staggered-item staggered-enter-1 text-gray-700 text-lg md:text-xl leading-relaxed">
              Experience top-quality healthcare services with compassion at Swasthya Saathi. We are committed to providing accessible and affordable healthcare for all.
            </p>
            
            <div className="staggered-item staggered-enter-2 flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/appointment">
                <Button className="bg-medical-600 hover:bg-medical-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center">
                  Book Appointment
                  <svg className="w-5 h-5 ml-2 animate-pulse-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="border-medical-600 text-medical-700 hover:bg-medical-50 px-8 py-6 text-lg rounded-lg">
                  Our Services
                </Button>
              </Link>
            </div>
            
            <div className="staggered-item staggered-enter-3 grid grid-cols-3 gap-4 pt-4 md:pt-8">
              <div className="text-center">
                <div className="text-medical-600 font-bold text-2xl md:text-3xl">50+</div>
                <div className="text-gray-600 text-sm">Specialists</div>
              </div>
              <div className="text-center">
                <div className="text-medical-600 font-bold text-2xl md:text-3xl">15k+</div>
                <div className="text-gray-600 text-sm">Patients</div>
              </div>
              <div className="text-center">
                <div className="text-medical-600 font-bold text-2xl md:text-3xl">99%</div>
                <div className="text-gray-600 text-sm">Satisfaction</div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-10 staggered-item staggered-enter-2 relative">
            <div className="relative z-10 animate-float">
              <img
                src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
                alt="Healthcare professionals"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="font-medium">Emergency Care</div>
                  <div className="text-xs text-gray-500">24/7 Available</div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-6 -left-6 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="font-medium">Online Booking</div>
                  <div className="text-xs text-gray-500">Easy Appointments</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,218.7C840,213,960,171,1080,165.3C1200,160,1320,192,1380,208L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
