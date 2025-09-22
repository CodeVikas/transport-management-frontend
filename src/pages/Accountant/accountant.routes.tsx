import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

const AccountantRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AccountantRoutes;
