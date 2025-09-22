import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import UserList from "./User/ListUser";
import AddUser from "./User/AddUser";
import ListFleet from "./Fleet/ListFleet";
import AddFleet from "./Fleet/AddFleet";
import ReportPage from "./Report/Report";
import BookingList from "./Booking/ListBooking";
import AddBooking from "./Booking/AddBooking";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />

      {/* User Routes */}
      <Route path="/user/list" element={<UserList />} />
      <Route path="/user/add" element={<AddUser />} />

      {/* Fleet Routes */}
      <Route path="/fleet/list" element={<ListFleet />} />
      <Route path="/fleet/add" element={<AddFleet />} />

      {/* Report Page  */}
      <Route path="/reports" element={<ReportPage />} />

      <Route path="/booking/list" element={<BookingList />} />
      <Route path="/booking/add" element={<AddBooking />} />
    </Routes>
  );
};

export default AdminRoutes;
