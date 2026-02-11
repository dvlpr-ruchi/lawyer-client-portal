import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scale, ArrowLeft, Mail, Lock } from "lucide-react";
import api from "../../network/api"

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // STEP 1: SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/app/v1/user/auth/forgot", { email });
      alert(res.data.message || "OTP sent to email");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: VERIFY OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/app/v1/user/auth/forgot/verify", { email, otp });
      alert(res.data.message || "OTP verified");
      setStep(3);
    } catch (err) {
      alert(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/app/v1/user/auth/forgot/pass", {
        email,
        password: newPassword,
      });

      alert(res.data.message || "Password updated successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* LEFT */}
      <div className="hidden lg:flex w-1/2 bg-black text-white items-center justify-center p-12">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center">
              <Scale className="text-black w-6 h-6" />
            </div>
            <span className="text-2xl font-bold font-serif">
              Legal<span className="text-yellow-600">Ease</span>
            </span>
          </div>

          <h2 className="text-3xl font-serif font-bold mb-4">
            Reset Your Password
          </h2>
          <p className="text-gray-300">
            Secure OTP-based password recovery
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

          <Link
            to="/login"
            className="flex items-center gap-2 text-gray-500 hover:text-black mb-6"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <h1 className="text-3xl font-bold font-serif">
                Forgot Password?
              </h1>
              <p className="text-gray-500">
                Enter your registered email address
              </p>

              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 px-4 py-3 border rounded-xl"
                  placeholder="Email address"
                  required
                />
              </div>

              <button
                disabled={loading}
                className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <h1 className="text-3xl font-bold font-serif">
                Verify OTP
              </h1>
              <p className="text-gray-500">
                OTP sent to {email}
              </p>

              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
                className="w-full text-center text-2xl py-3 border rounded-xl"
                placeholder="000000"
                required
              />

              <button
                disabled={loading}
                className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <h1 className="text-3xl font-bold font-serif">
                New Password
              </h1>

              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 py-3 border rounded-xl"
                  placeholder="New password"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="w-full pl-10 py-3 border rounded-xl"
                  placeholder="Confirm password"
                  required
                />
              </div>

              <button
                disabled={loading}
                className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;