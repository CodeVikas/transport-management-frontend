import React, { useState, useEffect } from "react";
import { MapPin, Phone, Edit } from "lucide-react";
import Card from "../../../components/Card";
import {
  fetchDriverBookings,
  tripStatusChange,
} from "../../../Store/feature/Booking/BookingThunk.js";
import { useDispatch, useSelector } from "react-redux";
import AddToTripModal from "./AddToTripModal";
import Loader from "../../../ShareFolder/Loader";
import moment from "moment";

export default function DriverDashboard() {
  const dispatch = useDispatch();
  const { driverBookings, statusDriverBookings } = useSelector((state) => state.bookings);
  const myTrips = driverBookings?.items || [];
  const searchTerm = "";
  const currentPage = 1;
  const bookingsPerPage = 100;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (statusDriverBookings === "idle") {
      const skip = (currentPage - 1) * bookingsPerPage;
      dispatch(
        fetchDriverBookings({
          skip,
          limit: bookingsPerPage,
          search: searchTerm,
        })
      );
    }
  }, [dispatch, statusDriverBookings, currentPage, bookingsPerPage, searchTerm]);

  const handleEdit = (trip) => {
    setSelectedBooking(trip);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleConfirmAddToTrip = async (updatedTrip) => {
    setIsModalOpen(false);
    setSelectedBooking(null);
    console.log("updatedTrip", updatedTrip);
    await dispatch(
      tripStatusChange({ id: updatedTrip?._id, tripStatus: updatedTrip.status })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(fetchDriverBookings({ skip: 0, limit: 10, search: "" }));
      }
    });
  };

  return (
    <div className="space-y-4 max-w-md mx-auto lg:max-w-none">
      {statusDriverBookings === "loading" ? (
        <Card title="My Trips">
          <div className="flex  justify-center items-center">
            <Loader colspan={5} />
          </div>
        </Card>
      ) : (
        <Card title="My Trips">
          <div className="space-y-3">
            {myTrips.map((trip) => (
              <div
                key={trip._id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-gray-900">
                    Customer : {trip?.driver?.fullName}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full
    ${trip.tripStatus === "Pending" ? "bg-yellow-100 text-yellow-800" : ""}
    ${trip.tripStatus === "In Transit" ? "bg-blue-100 text-blue-800" : ""}
    ${trip.tripStatus === "Start Trip" ? "bg-purple-100 text-purple-800" : ""}
    ${trip.tripStatus === "Delivered" ? "bg-green-100 text-green-800" : ""}
  `}
                    >
                      {trip.tripStatus}
                    </span>

                    <button
                      className="text-blue-600 hover:text-blue-800"
                      title="Add to My Trip"
                    >
                      <Edit size={18} onClick={() => handleEdit(trip)} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <MapPin size={14} />
                    <span>
                      {trip.pickupLocation} → {trip.dropLocation}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <Phone size={14} />
                    <span>{trip?.driver?.phone}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Load: {trip.cargoDescription}
                    </span>
                    <span className="text-gray-500">
                      {" "}
                      {trip?.bookingDate
                        ? moment(trip.bookingDate).format("ll")
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      <AddToTripModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        booking={selectedBooking}
        onConfirm={handleConfirmAddToTrip}
      />
    </div>
  );
}
