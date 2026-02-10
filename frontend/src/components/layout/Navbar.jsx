import React from 'react'
import { Link } from 'react-router-dom';
import { Scale, Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
      <nav className="bg-transparent absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
                <Scale className="text-yellow-400 w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-serif text-white">
                Legal<span className="text-yellow-400">Ease</span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/find-lawyer" className="text-white/90 hover:text-yellow-400 font-medium transition-colors">
                Find Lawyers
              </Link>
              <Link to="/practice-areas" className="text-white/90 hover:text-yellow-400 font-medium transition-colors">
                Practice Areas
              </Link>
              <Link to="/how-it-works" className="text-white/90 hover:text-yellow-400 font-medium transition-colors">
                How it Works
              </Link>
              <Link to="/about" className="text-white/90 hover:text-yellow-400 font-medium transition-colors">
                About Us
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="px-5 py-2 text-white/90 hover:text-yellow-400 font-semibold transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-white text-black rounded-lg hover:bg-white/90 font-semibold transition-colors"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md">
            <div className="px-4 py-3 space-y-3">
              <Link to="/find-lawyer" className="block py-2 text-white/90 hover:text-white font-medium">
                Find Lawyers
              </Link>
              <Link to="/practice-areas" className="block py-2 text-white/90 hover:text-white font-medium">
                Practice Areas
              </Link>
              <Link to="/how-it-works" className="block py-2 text-white/90 hover:text-white font-medium">
                How it Works
              </Link>
              <Link to="/about" className="block py-2 text-white/90 hover:text-white font-medium">
                About Us
              </Link>
              <div className="pt-3 border-t border-white/20 space-y-2">
                <Link to="/login" className="block py-2 text-center border border-white/30 text-white rounded-lg font-semibold">
                  Login
                </Link>
                <Link to="/signup" className="block py-2 text-center bg-white text-black rounded-lg font-semibold">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
  );
};

export default Navbar;