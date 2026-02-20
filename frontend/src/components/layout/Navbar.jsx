import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scale, Menu, X } from "lucide-react";
import api from "../../network/api";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/api/v1/user/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.log("Logout API error:", error);
    } finally {
      // Always clear frontend data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    }
  };

  return (
    <nav className="bg-transparent absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
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

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-white hover:text-yellow-400"
                >
                  <img
                    src={user.image}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover border"
                  />
                  <span>{user.name}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white text-black rounded-lg font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 text-white hover:text-yellow-400 font-semibold"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-5 py-2 bg-white text-black rounded-lg font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90">
          <div className="px-4 py-3 space-y-3">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 text-white py-2"
                >
                  <img
                    src={user.image}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                  {user.name}
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full py-2 bg-white text-black rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-center border border-white/30 text-white rounded-lg"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="block py-2 text-center bg-white text-black rounded-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
