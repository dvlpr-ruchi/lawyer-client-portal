// 3. ForgotPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scale, ArrowLeft, Phone, Lock, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Enter Phone, 2: Verify OTP, 3: Reset Password
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setStep(2);
      setLoading(false);
      alert("OTP sent to " + phone);
    }, 1000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Password reset for:", phone);
    alert("Password reset successful!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Hero */}
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
          <p className="text-gray-300 mb-8">
            Don't worry! It happens. We'll help you reset your password quickly and securely.
          </p>

          <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-xl p-6">
            <p className="text-yellow-500 font-semibold mb-4">Steps to Reset</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-yellow-600 text-black' : 'bg-gray-700 text-gray-400'}`}>
                  1
                </div>
                <span className="text-sm text-gray-300">Enter mobile number</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-yellow-600 text-black' : 'bg-gray-700 text-gray-400'}`}>
                  2
                </div>
                <span className="text-sm text-gray-300">Verify OTP</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-yellow-600 text-black' : 'bg-gray-700 text-gray-400'}`}>
                  3
                </div>
                <span className="text-sm text-gray-300">Create new password</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <Link to="/login" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-colors">
              <ArrowLeft size={16} />
              <span className="text-sm font-medium">Back to Login</span>
            </Link>

            <div className="lg:hidden flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Scale className="text-yellow-600 w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-serif">
                Legal<span className="text-yellow-600">Ease</span>
              </span>
            </div>

            {/* Step 1: Enter Phone Number */}
            {step === 1 && (
              <>
                <h1 className="text-3xl font-serif font-bold mb-2">
                  Forgot Password?
                </h1>
                <p className="text-gray-500 mb-8">
                  Enter your registered mobile number to receive OTP
                </p>

                <form onSubmit={handleSendOtp} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <div className="px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 font-semibold text-gray-700">
                        +91
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all"
                        placeholder="Enter mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 flex items-center justify-center gap-2 font-semibold transition-all disabled:opacity-50"
                    disabled={phone.length !== 10 || loading}
                  >
                    <Phone size={18} />
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                </form>
              </>
            )}

            {/* Step 2: Verify OTP */}
            {step === 2 && (
              <>
                <h1 className="text-3xl font-serif font-bold mb-2">
                  Verify OTP
                </h1>
                <p className="text-gray-500 mb-8">
                  Enter the 6-digit code sent to +91 {phone}
                </p>

                <form onSubmit={handleVerifyOtp} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all text-center text-2xl font-bold tracking-widest"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      required
                    />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500">Didn't receive code?</p>
                      <button
                        type="button"
                        onClick={() => {
                          setStep(1);
                          setOtp("");
                        }}
                        className="text-xs text-yellow-600 font-semibold hover:underline"
                      >
                        Resend OTP
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 font-semibold transition-all disabled:opacity-50"
                    disabled={otp.length !== 6}
                  >
                    Verify OTP
                  </button>
                </form>
              </>
            )}

            {/* Step 3: Reset Password */}
            {step === 3 && (
              <>
                <h1 className="text-3xl font-serif font-bold mb-2">
                  Create New Password
                </h1>
                <p className="text-gray-500 mb-8">
                  Choose a strong password for your account
                </p>

                <form onSubmit={handleResetPassword} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input
                        type="password"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input
                        type="password"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all"
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 font-semibold transition-all"
                  >
                    Reset Password
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;