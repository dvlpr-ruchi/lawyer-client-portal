import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scale, ArrowLeft, User, Mail, Lock } from "lucide-react";
import api from "../../network/api";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ================= SEND OTP =================
  const handleSendOtp = async () => {
    if (!formData.email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/api/v1/user/auth/register", {
        email: formData.email,
      });

      if (res.data.success) {
        setOtpSent(true);
        setSuccess("OTP sent to your email");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFY OTP & SIGNUP =================
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!agreedToTerms) {
      setError("Please accept Terms & Conditions");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/api/v1/user/auth/verify-otp", {
        email: formData.email,
        otp,
        fullName: formData.fullName,
        contact: formData.contact,
        password: formData.password,
      });

      if (res.data.success) {
        setSuccess("Account created successfully!");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* LEFT */}
      <div className="hidden lg:flex w-1/2 bg-black text-white items-center justify-center p-12">
        <div>
          <h2 className="text-3xl font-serif font-bold mb-4">
            Join India's Trusted Legal Platform
          </h2>
          <p className="text-gray-300">
            Connect with verified lawyers across India.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          <Link to="/" className="flex items-center gap-2 text-gray-500 mb-4">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Scale className="text-white" />
            </div>
            <span className="text-xl font-bold font-serif">
              Legal<span className="text-yellow-600">Ease</span>
            </span>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium">Email *</label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  className="w-full pl-10 py-2 border rounded-lg"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={otpSent}
                  required
                />
              </div>
            </div>

            {/* SEND OTP */}
            {!otpSent && (
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full border-2 border-yellow-600 text-yellow-600 py-2 rounded-lg"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            )}

            {/* OTP INPUT */}
            {otpSent && (
              <>
                <div>
                  <label className="text-sm font-medium">OTP *</label>
                  <input
                    type="text"
                    maxLength={6}
                    className="w-full text-center py-2 border rounded-lg tracking-widest"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>

                {/* FULL NAME */}
                <div>
                  <label className="text-sm font-medium">Full Name *</label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      className="w-full pl-10 py-2 border rounded-lg"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                {/* MOBILE */}
                <div>
                  <label className="text-sm font-medium">Mobile Number *</label>
                  <input
                    type="tel"
                    maxLength={10}
                    className="w-full py-2 border rounded-lg"
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="text-sm font-medium">Password *</label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />
                    <input
                      type="password"
                      className="w-full pl-10 py-2 border rounded-lg"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                      required
                      minLength={8}
                    />
                  </div>
                </div>

                {/* TERMS */}
                <label className="flex gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  I agree to Terms & Conditions
                </label>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </>
            )}
          </form>

          <p className="text-center text-gray-500 mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-600 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
