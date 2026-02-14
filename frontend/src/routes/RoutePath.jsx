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
    </Routes>
  );
};

export default RoutePath;
