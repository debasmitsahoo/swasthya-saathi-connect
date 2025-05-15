
import { useEffect, useRef } from "react";

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

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

    if (featuresRef.current) {
      const features = featuresRef.current.querySelectorAll(".feature-item");
      features.forEach((feature) => {
        observer.observe(feature);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-medical-900 mb-4">
            Why Choose Swasthya Saathi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our commitment to excellence in healthcare makes us the preferred choice for patients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10" ref={featuresRef}>
          <div className="feature-item staggered-item staggered-enter-0 bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-medical-100 rounded-bl-full -mr-8 -mt-8 transition-all duration-300 group-hover:bg-medical-200"></div>
            <div className="relative z-10">
              <div className="bg-medical-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-medical-200">
                <svg className="w-8 h-8 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-medical-900 mb-3">Experienced Doctors</h3>
              <p className="text-gray-600">
                Our team of experienced and specialized doctors ensures you receive the best possible care with personal attention.
              </p>
            </div>
          </div>

          <div className="feature-item staggered-item staggered-enter-1 bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-medical-100 rounded-bl-full -mr-8 -mt-8 transition-all duration-300 group-hover:bg-medical-200"></div>
            <div className="relative z-10">
              <div className="bg-medical-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-medical-200">
                <svg className="w-8 h-8 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-medical-900 mb-3">Advanced Technology</h3>
              <p className="text-gray-600">
                We invest in the latest medical technology and equipment to provide accurate diagnosis and effective treatments.
              </p>
            </div>
          </div>

          <div className="feature-item staggered-item staggered-enter-2 bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-medical-100 rounded-bl-full -mr-8 -mt-8 transition-all duration-300 group-hover:bg-medical-200"></div>
            <div className="relative z-10">
              <div className="bg-medical-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-medical-200">
                <svg className="w-8 h-8 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-medical-900 mb-3">24/7 Emergency Care</h3>
              <p className="text-gray-600">
                Our emergency department is staffed 24/7 with trained professionals ready to provide immediate medical attention.
              </p>
            </div>
          </div>

          <div className="feature-item staggered-item staggered-enter-0 bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-medical-100 rounded-bl-full -mr-8 -mt-8 transition-all duration-300 group-hover:bg-medical-200"></div>
            <div className="relative z-10">
              <div className="bg-medical-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-medical-200">
                <svg className="w-8 h-8 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-medical-900 mb-3">Patient-Centered Care</h3>
              <p className="text-gray-600">
                We focus on personalized care, ensuring that each patient's unique needs are addressed with compassion.
              </p>
            </div>
          </div>

          <div className="feature-item staggered-item staggered-enter-1 bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-medical-100 rounded-bl-full -mr-8 -mt-8 transition-all duration-300 group-hover:bg-medical-200"></div>
            <div className="relative z-10">
              <div className="bg-medical-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-medical-200">
                <svg className="w-8 h-8 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-medical-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                We maintain the highest standards of quality and safety in all our medical services and procedures.
              </p>
            </div>
          </div>

          <div className="feature-item staggered-item staggered-enter-2 bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-medical-100 rounded-bl-full -mr-8 -mt-8 transition-all duration-300 group-hover:bg-medical-200"></div>
            <div className="relative z-10">
              <div className="bg-medical-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-medical-200">
                <svg className="w-8 h-8 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-medical-900 mb-3">Affordable Care</h3>
              <p className="text-gray-600">
                We provide high-quality healthcare at affordable rates, making medical care accessible to more people.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
