import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import BookingList from "../Common/Booking/ListBooking";
import AddBooking from "../Common/Booking/AddBooking";
import TrackingPage from "./Tracking/Tracking";
import AlertPage from "./Alert/Alert";

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/booking/list" element={<BookingList />} />
      <Route path="/booking/add" element={<AddBooking />} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="/alert" element={<AlertPage />} />
    </Routes>
  );
};

export default ManagerRoutes;
