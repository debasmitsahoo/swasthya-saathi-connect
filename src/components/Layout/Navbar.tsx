
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <div
            className={`rounded-full bg-gradient-to-r from-medical-700 to-medical-500 p-1.5 
            transition-all duration-300 ${isScrolled ? "scale-90" : ""}`}
          >
            <span className="text-white font-bold text-xl">SS</span>
          </div>
          <span
            className={`font-poppins font-semibold text-xl ${
              isScrolled ? "text-medical-900" : "text-medical-800"
            }`}
          >
            Swasthya Saathi
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-medical-800 hover:text-medical-600 font-medium">
            Home
          </Link>
          <Link to="/services" className="text-medical-800 hover:text-medical-600 font-medium">
            Services
          </Link>
          <Link to="/about" className="text-medical-800 hover:text-medical-600 font-medium">
            About Us
          </Link>
          <Link to="/contact" className="text-medical-800 hover:text-medical-600 font-medium">
            Contact
          </Link>
          <div className="flex items-center space-x-3">
            <Link to="/admin">
              <Button variant="outline" className="border-medical-600 text-medical-700 hover:bg-medical-50">
                Admin Login
              </Button>
            </Link>
            <Link to="/appointment">
              <Button className="bg-gradient-to-r from-medical-600 to-medical-700 hover:from-medical-700 hover:to-medical-800">
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-medical-800 focus:outline-none"
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
            <Link
              to="/"
              className="text-medical-800 py-2 hover:text-medical-600 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="text-medical-800 py-2 hover:text-medical-600 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/about"
              className="text-medical-800 py-2 hover:text-medical-600 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-medical-800 py-2 hover:text-medical-600 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-2 pt-2 pb-3">
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full border-medical-600 text-medical-700">
                  Admin Login
                </Button>
              </Link>
              <Link to="/appointment" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-medical-600 to-medical-700">
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
