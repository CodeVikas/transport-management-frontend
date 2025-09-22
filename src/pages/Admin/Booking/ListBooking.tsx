import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Ban,
  Circle,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookings,
  deleteBooking,
} from "../../../Store/feature/Booking/BookingThunk.js";
import DeleteConfirmationModal from "../../../ShareFolder/DialogBox";
import Tooltip from "../../../ShareFolder/Tooltip";
import Loader from "../../../ShareFolder/Loader";
import moment from "moment";

export default function BookingListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookings, status } = useSelector((state) => state.bookings);
  console.log("Bookings from state:", bookings);
  const bookingData = bookings?.items;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage, setbookingsPerPage] = useState(10);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      const skip = (currentPage - 1) * bookingsPerPage;
      dispatch(
        fetchBookings({
          skip,
          limit: bookingsPerPage,
          search: searchTerm,
        })
      );
    }
  }, [dispatch, status, currentPage, bookingsPerPage, searchTerm]); // Add searchTerm to dependencies

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
    const skip = 0; // Reset skip to 0 since we're going back to first page
    dispatch(
      fetchBookings({
        skip,
        limit: bookingsPerPage,
        search: e.target.value,
      })
    );
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const skip = (newPage - 1) * bookingsPerPage;
    dispatch(
      fetchBookings({
        skip,
        limit: bookingsPerPage,
        search: searchTerm, // Include the current search term
      })
    );
  };

  const handleRowsPerPageChange = (newValue) => {
    const value = parseInt(newValue, 10);
    setBookingsPerPage(value);
    setCurrentPage(1); // Reset to first page
    dispatch(
      fetchBookings({
        skip: 0,
        limit: value,
        search: searchTerm, // Include the current search term
      })
    );
  };

  // Pagination Logic
  const totalPages = Math.ceil(bookings?.total / bookingsPerPage);
  const handleEdit = (booking) => {
    navigate("/admin/booking/add", { state: { bookingId: booking?._id } });
  };

  const handleDelete = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
    // dispatch(deletebooking(booking)).then(() => {
    //   dispatch(fetchbookings());
    // });
  };

  const confirmDelete = () => {
    console.log("Deleting booking:", selectedBooking);
    if (selectedBooking) {
      dispatch(deleteBooking(selectedBooking)).then(() => {
        dispatch(fetchBookings({ skip: 0, limit: 10, search: "" }));
        setIsModalOpen(false);
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  return (
    <div className="p-2 space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Booking List
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track Booking information
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            onClick={() => navigate("/admin/booking/add")}
          >
            <Plus size={18} />
            Add Booking
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex justify-between items-center border rounded-lg px-4 py-2 bg-white shadow-sm w-1/2">
              <input
                type="text"
                placeholder="Search Bookings ..."
                className="w-full outline-none bg-transparent"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search size={20} className="text-gray-500" />
            </div>
            <p className="text-sm text-gray-500">Total Bookings: {bookings.total}</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-sm">
              <tr>
                <th className="px-8 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Booking Info
                </th>
                <th className="px-8 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Booking Date
                </th>
                <th className="px-8 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-8 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-8 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {status === "loading" ? (
                <Loader colspan={5} />
              ) : bookingData?.length > 0 ? (
                bookingData.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-8 py-5">
                      <div className="flex">
                        <div className="font-medium text-gray-900">Pickup Location : </div>
                        <div className="text-sm text-gray-500">
                          {booking.pickupLocation || "N/A"}
                        </div>
                      </div>
                      <div className="flex py-2">
                        <div className="font-medium text-gray-900">Drop Location : </div>
                        <div className="text-sm text-gray-500">
                          {booking.dropLocation || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      {booking?.createdAt
                        ? moment(booking.bookingDate).format("ll")
                        : "N/A"}
                    </td>
                    <td className="px-8 py-5">
                      {booking?.createdAt
                        ? moment(booking.createdAt).format("ll")
                        : "N/A"}
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status ? "Active" : "Deactivated"}
                      </span>
                    </td>

                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <Tooltip content="Edit">
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <Edit2 size={18} onClick={() => handleEdit(booking)} />
                          </button>
                        </Tooltip>
                        <Tooltip content="Change Status">
                          <button
                            className={`text-red-600 hover:text-red-800`}
                            onClick={() => handleDelete(booking)}
                          >
                            {booking.status ? (
                              <Ban size={18} />
                            ) : (
                              <Circle size={18} />
                            )}
                          </button>
                        </Tooltip>

                        {/* <Tooltip content="Assign Permissions">
                          <button className="text-indigo-600 hover:text-indigo-800">
                            <Key size={18} />
                          </button>
                          </Tooltip> */}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-8 py-5 text-center text-gray-500"
                  >
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4 border-t">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page:</span>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={bookingsPerPage}
              onChange={(e) => handleRowsPerPageChange(e.target.value)}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-600 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft size={18} /> Previous
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-gray-600 disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
