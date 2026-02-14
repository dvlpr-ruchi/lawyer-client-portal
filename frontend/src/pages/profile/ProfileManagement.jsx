import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../network/api";
import {
  Scale,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Lock,
  Save,
  Edit2,
  Check,
  X,
  Building2,
} from "lucide-react";
import "./Profilemanagement.css";

const ProfileManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    dateOfBirth: "",
    address: "",
    image: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswordSection, setShowPasswordSection] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/v1/user/profile");
 
      console.log("profile", res.data);
      

      const user = res.data?.user;

      setProfileData({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.contact || "",
        city: user?.city || "",
        state: user?.state || "",
        dateOfBirth: user?.dateOfBirth?.substring(0, 10) || "",
        address: user?.address || "",
        image: user?.image || "",
      });
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", profileData.name);
      formData.append("email", profileData.email);
      formData.append("city", profileData.city);
      formData.append("state", profileData.state);
      formData.append("dateOfBirth", profileData.dateOfBirth);
      formData.append("address", profileData.address);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await api.put("/app/v1/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50/20 to-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="font-medium hidden sm:inline">Back to Dashboard</span>
              <span className="font-medium sm:hidden">Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <Scale className="text-yellow-600" size={24} />
              <span className="font-bold text-xl">
                Legal<span className="text-yellow-600">Ease</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* SUCCESS MESSAGE */}
      {saveSuccess && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 slide-in z-50">
          <Check size={20} />
          <span className="font-medium">Profile updated successfully!</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* PAGE TITLE */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT SIDEBAR - PROFILE CARD */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden sticky top-24">
              <div className="h-24 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
              <div className="px-6 pb-6">
                <div className="relative -mt-16 mb-4">
                  <div className="relative inline-block">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                      <img
                        src={
                          imageFile
                            ? URL.createObjectURL(imageFile)
                            : profileData.image || "https://via.placeholder.com/150"
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-yellow-600 hover:bg-yellow-700 text-white p-2.5 rounded-xl cursor-pointer shadow-lg transition-colors">
                        <Camera size={18} />
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => setImageFile(e.target.files[0])}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {profileData.name || "Your Name"}
                    </h2>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <Mail size={14} />
                      <span className="text-sm">{profileData.email}</span>
                    </p>
                  </div>

                  {profileData.phone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={16} />
                      <span className="text-sm">{profileData.phone}</span>
                    </div>
                  )}

                  {(profileData.city || profileData.state) && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} />
                      <span className="text-sm">
                        {[profileData.city, profileData.state]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`mt-6 w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                    isEditing
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-yellow-600 text-white hover:bg-yellow-700 shadow-md hover:shadow-lg"
                  }`}
                >
                  {isEditing ? (
                    <>
                      <X size={18} />
                      Cancel Editing
                    </>
                  ) : (
                    <>
                      <Edit2 size={18} />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT - FORM */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSave} className="space-y-6">
              {/* PERSONAL INFORMATION */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <User className="text-yellow-600" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Personal Information
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={profileData.name}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfileData({ ...profileData, name: e.target.value })
                        }
                        className={`w-full pl-12 pr-4 py-3.5 border rounded-xl transition-all ${
                          isEditing
                            ? "border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 bg-white"
                            : "border-gray-200 bg-gray-50 text-gray-600"
                        } outline-none`}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        value={profileData.email}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfileData({ ...profileData, email: e.target.value })
                        }
                        className={`w-full pl-12 pr-4 py-3.5 border rounded-xl transition-all ${
                          isEditing
                            ? "border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 bg-white"
                            : "border-gray-200 bg-gray-50 text-gray-600"
                        } outline-none`}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="date"
                        value={profileData.dateOfBirth}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            dateOfBirth: e.target.value,
                          })
                        }
                        className={`w-full pl-12 pr-4 py-3.5 border rounded-xl transition-all ${
                          isEditing
                            ? "border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 bg-white"
                            : "border-gray-200 bg-gray-50 text-gray-600"
                        } outline-none`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* LOCATION INFORMATION */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <MapPin className="text-yellow-600" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Location Details
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>
                    <div className="relative">
                      <Building2
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="Enter city"
                        value={profileData.city}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfileData({ ...profileData, city: e.target.value })
                        }
                        className={`w-full pl-12 pr-4 py-3.5 border rounded-xl transition-all ${
                          isEditing
                            ? "border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 bg-white"
                            : "border-gray-200 bg-gray-50 text-gray-600"
                        } outline-none`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="Enter state"
                        value={profileData.state}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfileData({ ...profileData, state: e.target.value })
                        }
                        className={`w-full pl-12 pr-4 py-3.5 border rounded-xl transition-all ${
                          isEditing
                            ? "border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 bg-white"
                            : "border-gray-200 bg-gray-50 text-gray-600"
                        } outline-none`}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Address
                    </label>
                    <textarea
                      placeholder="Enter your complete address"
                      value={profileData.address}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setProfileData({ ...profileData, address: e.target.value })
                      }
                      rows="3"
                      className={`w-full px-4 py-3.5 border rounded-xl transition-all resize-none ${
                        isEditing
                          ? "border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 bg-white"
                          : "border-gray-200 bg-gray-50 text-gray-600"
                      } outline-none`}
                    />
                  </div>
                </div>
              </div>

              {/* SAVE BUTTON */}
              {isEditing && (
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setImageFile(null);
                      fetchProfile();
                    }}
                    className="px-6 py-3.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-yellow-600 text-white font-semibold rounded-xl hover:bg-yellow-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;