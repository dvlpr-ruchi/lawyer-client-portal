// 4. ProfileManagement.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Scale, ArrowLeft, User, Mail, Phone, MapPin, Calendar, Camera, Lock, Save, Edit2, CheckCircle } from "lucide-react";

const ProfileManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "9876543210",
    city: "Mumbai",
    state: "Maharashtra",
    dateOfBirth: "1990-05-15",
    address: "123, Marine Drive, Mumbai - 400001",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswordSection, setShowPasswordSection] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Updated profile:", profileData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    console.log("Password change requested");
    alert("Password changed successfully!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setShowPasswordSection(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors">
              <ArrowLeft size={16} />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Scale className="text-yellow-600 w-4 h-4" />
              </div>
              <span className="text-lg font-bold font-serif">
                Legal<span className="text-yellow-600">Ease</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-16 h-16 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-xl shadow-lg hover:bg-gray-800 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold font-serif text-gray-800 mb-2">
                {profileData.name}
              </h1>
              <p className="text-gray-600 mb-3">{profileData.email}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-semibold">
                  Verified Account
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                  Member since 2024
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                isEditing
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isEditing ? (
                <>
                  <span>Cancel</span>
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Profile Details Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-xl font-bold font-serif text-gray-800 mb-6">
            Personal Information
          </h2>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all disabled:bg-gray-50"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all disabled:bg-gray-50"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Phone */}
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
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 cursor-not-allowed"
                    value={profileData.phone}
                    disabled
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Phone number cannot be changed</p>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all disabled:bg-gray-50"
                    value={profileData.dateOfBirth}
                    onChange={(e) =>
                      setProfileData({ ...profileData, dateOfBirth: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all disabled:bg-gray-50"
                    value={profileData.city}
                    onChange={(e) =>
                      setProfileData({ ...profileData, city: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all disabled:bg-gray-50"
                  value={profileData.state}
                  onChange={(e) =>
                    setProfileData({ ...profileData, state: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Address
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all disabled:bg-gray-50 resize-none"
                value={profileData.address}
                onChange={(e) =>
                  setProfileData({ ...profileData, address: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            {isEditing && (
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            )}
          </form>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold font-serif text-gray-800 mb-1">
                Security Settings
              </h2>
              <p className="text-sm text-gray-600">Manage your password and security</p>
            </div>
            <button
              onClick={() => setShowPasswordSection(!showPasswordSection)}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold transition-all flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Change Password
            </button>
          </div>

          {showPasswordSection && (
            <form onSubmit={handlePasswordChange} className="space-y-5 pt-6 border-t border-gray-200">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all"
                    placeholder="Enter current password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, currentPassword: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

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
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    required
                    minLength={6}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all"
                    placeholder="Re-enter new password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 font-semibold transition-all"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordSection(false);
                    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                  }}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;