import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Mail } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    // Check if we're on the home page
    if (location.pathname === "/" || location.pathname === "/home") {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80, // Offset for navbar height
          behavior: "smooth"
        });
        setIsMobileMenuOpen(false);
      }
    } else {
      // If not on home page, navigate to home and then scroll
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2 group">
          <div
            className={`rounded-full bg-gradient-to-r from-medical-700 to-medical-500 p-2 
            transition-all duration-300 ${isScrolled ? "scale-90" : ""} group-hover:scale-105`}
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 8c-1.7 0-3 1.3-3 3v2c0 1.7-1.3 3-3 3h-2c-1.7 0-3-1.3-3-3v-2c0-1.7-1.3-3-3-3H2v10h17c1.7 0 3-1.3 3-3v-4c0-1.7-1.3-3-3-3z" fill="currentColor"/>
              <path d="M12 2c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor"/>
            </svg>
          </div>
          <span
            className={`font-poppins font-semibold text-xl ${
              isScrolled ? "text-medical-900" : "text-medical-800"
            } group-hover:text-medical-600 transition-colors duration-300`}
          >
            Swasthya Saathi
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => scrollToSection("home")} 
            className="text-medical-800 hover:text-medical-600 font-medium relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-medical-600 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left after:duration-300"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection("services")} 
            className="text-medical-800 hover:text-medical-600 font-medium relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-medical-600 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left after:duration-300"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection("features")} 
            className="text-medical-800 hover:text-medical-600 font-medium relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-medical-600 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left after:duration-300"
          >
            About Us
          </button>
          <Link to="/contact" className="text-medical-800 hover:text-medical-600 font-medium flex items-center gap-1 group relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-medical-600 after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left after:duration-300">
            <Mail size={16} className="transition-transform group-hover:rotate-12" />
            Contact
          </Link>
          <div className="flex items-center space-x-3">
            <Link to="/admin">
              <Button variant="outline" className="border-medical-600 text-medical-700 hover:bg-medical-50 transition-all duration-300 hover:-translate-y-0.5">
                Admin Login
              </Button>
            </Link>
            <Link to="/appointment">
              <Button className="bg-gradient-to-r from-medical-600 to-medical-700 hover:from-medical-700 hover:to-medical-800 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-medical-800 focus:outline-none hover:text-medical-600 transition-colors duration-300"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-fade-in">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <button
              onClick={() => scrollToSection("home")}
              className="text-medical-800 py-2 hover:text-medical-600 hover:pl-2 font-medium text-left transition-all duration-300"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-medical-800 py-2 hover:text-medical-600 hover:pl-2 font-medium text-left transition-all duration-300"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-medical-800 py-2 hover:text-medical-600 hover:pl-2 font-medium text-left transition-all duration-300"
            >
              About Us
            </button>
            <Link
              to="/contact"
              className="text-medical-800 py-2 hover:text-medical-600 hover:pl-2 font-medium flex items-center gap-1 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Mail size={16} />
              Contact
            </Link>
            <div className="flex flex-col space-y-2 pt-2 pb-3">
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full border-medical-600 text-medical-700 hover:bg-medical-50 transition-all duration-300">
                  Admin Login
                </Button>
              </Link>
              <Link to="/appointment" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-medical-600 to-medical-700 hover:from-medical-700 hover:to-medical-800 transition-all duration-300">
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
