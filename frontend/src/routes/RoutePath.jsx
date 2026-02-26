import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../pages/signup/Signup";
import Login from "../pages/login/Login";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import DashboardPanel from "../components/dashboard/DashboardPanel";
import FindLawyer from "../components/laywer/FindLawyer";
import Profile from "../pages/profile/ProfileManagement"
import HomePage from "../pages/home/HomePage"
import AllLawyers from "../components/lawyers/AllLawyers";
import UploadDocuments from "../pages/upload/UploadDocuments";
import Notifications from "../pages/notifications/Notifications";
import About from "../pages/about/About";
import Terms from "../pages/terms&conditions/Terms"
import FAQ from "../pages/FAQ/FAQ";


const RoutePath = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPanel />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/find-lawyer" element={<FindLawyer />} />
      <Route path="/all-lawyers" element={<AllLawyers />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/upload-documents" element={<UploadDocuments />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/faq" element={<FAQ />} />
    </Routes>
  );
};

export default RoutePath;
