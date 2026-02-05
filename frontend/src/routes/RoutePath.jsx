import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../pages/signup/Signup";

const RoutePath = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default RoutePath;
