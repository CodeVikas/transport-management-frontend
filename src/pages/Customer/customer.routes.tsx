import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import BookingList from "./Booking/ListBooking";
import BookingInvoiceList from "./Invoice/ListBooking";
import FeedbackPage from "./Feedback/FeedbackPage";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/booking/list" element={<BookingList />} />
      <Route path="/booking/invoice" element={<BookingInvoiceList />} />
      <Route path="/feedback" element={<FeedbackPage />} />
    </Routes>
  );
};

export default CustomerRoutes;
