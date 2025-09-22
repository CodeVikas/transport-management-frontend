import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
};

export default AuthRoutes;
