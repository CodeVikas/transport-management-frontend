import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import BookingList from "./Booking/ListBooking";
import MyTripList from "./MyTrips/MytripList";
import ProofDelivery from "./ProofDelivery/ProofDelivery";
import NotifiacationPage from "./Notification/Notification";

const  DriverRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/booking/list" element={<BookingList />} />
      <Route path="/my-trips/list" element={<MyTripList />} />
      <Route path="/delivery" element={<ProofDelivery />} />
      <Route path="/notifications" element={<NotifiacationPage />} />

    </Routes>
  );
};

export default  DriverRoutes;
