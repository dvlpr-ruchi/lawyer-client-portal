import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scale, ArrowLeft, Phone, Mail } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [loginMethod, setLoginMethod] = useState("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Login data:", { loginMethod, phone, email, password, otp });

    // if (loginMethod === "phone") {
    //   if (!otpSent || otp.length !== 6) return;
    //   navigate("/dashboard");
    //   return;
    // }

    // if (!email || !password) return;
    // navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-black mb-8">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Scale className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold font-serif">
              Legal<span className="text-yellow-600">Ease</span>
            </span>
          </Link>

          <h1 className="text-3xl font-serif font-bold mb-2">Welcome back</h1>
          <p className="text-gray-500 mb-8">Login to access your account</p>

          {/* Toggle */}
          <div className="flex bg-gray-200 rounded-xl p-1 mb-8">
            <button
              type="button"
              onClick={() => {
                setLoginMethod("phone");
                setOtpSent(false);
                setOtp("");
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition
                ${loginMethod === "phone" ? "bg-white shadow" : "text-gray-500"}`}
            >
              <Phone size={16} /> Phone
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginMethod("email");
                setOtpSent(false);
                setOtp("");
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition
                ${loginMethod === "email" ? "bg-white shadow" : "text-gray-500"}`}
            >
              <Mail size={16} /> Email
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            {loginMethod === "phone" ? (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <div className="px-4 flex items-center border rounded-lg bg-gray-100">
                      +91
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                      placeholder="Enter mobile number"
                    />
                  </div>
                </div>

                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={phone.length !== 10}
                    className="w-full py-3 rounded-lg bg-black text-white hover:bg-gray-800 disabled:opacity-50"
                  >
                    Send OTP
                  </button>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Enter OTP
                      </label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        placeholder="6-digit OTP"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        OTP sent to +91 {phone}{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setOtp("");
                          }}
                          className="text-yellow-600 hover:underline"
                        >
                          Change
                        </button>
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={otp.length !== 6}
                      className="w-full py-3 rounded-lg bg-black text-white hover:bg-gray-800 disabled:opacity-50"
                    >
                      Verify & Login
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    placeholder="Enter email"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Password</label>
                    <Link to="/forgot-password" className="text-sm text-yellow-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    placeholder="Enter password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-black text-white hover:bg-gray-800"
                >
                  Login
                </button>
              </>
            )}
          </form>

          <p className="text-center text-gray-500 mt-8">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-yellow-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-black text-white items-center justify-center p-12 text-center">
        <div className="max-w-md">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Access Legal Help Anytime, Anywhere
          </h2>
          <p className="text-gray-300">
            Connect with verified lawyers across India and get expert legal advice from home.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
