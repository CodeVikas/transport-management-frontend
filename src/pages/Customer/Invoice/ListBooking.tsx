import React, { useEffect, useRef } from "react";
import { MapPin, Phone, Printer } from "lucide-react";
import Card from "../../../components/Card";
import { fetchDeliveredBookings } from "../../../Store/feature/Booking/BookingThunk.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../ShareFolder/Loader";
import Invoice from "./Invoice";

export default function DriverDashboard() {
  const dispatch = useDispatch();
  const invoiceRefs = useRef({});
  const { deliveredBookings, statusDeliveredBookings } = useSelector((state) => state.bookings);
  const myTrips = deliveredBookings?.items || [];
  const searchTerm = "";
  const currentPage = 1;
  const bookingsPerPage = 100;

  useEffect(() => {
    if (statusDeliveredBookings === "idle") {
      const skip = (currentPage - 1) * bookingsPerPage;
      dispatch(
        fetchDeliveredBookings({
          skip,
          limit: bookingsPerPage,
          search: searchTerm,
        })
      );
    }
  }, [dispatch, statusDeliveredBookings, currentPage, bookingsPerPage, searchTerm]);

  const handlePrintInvoice = (trip) => {
    const printWindow = window.open("", "_blank");
    printWindow?.document.write(`
    <html>
      <head>
        <title>Invoice #${trip._id}</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body>
        ${invoiceRefs.current[trip._id]?.innerHTML}
        <script>window.print();</script>
      </body>
    </html>
  `);
    printWindow?.document.close();
  };

  return (
    <div className="space-y-4 max-w-md mx-auto lg:max-w-none">
      {statusDeliveredBookings === "loading" ? (
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
                    {trip?.cargoDescription}
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
                      title="Print Invoice"
                      onClick={() => handlePrintInvoice(trip)}
                    >
                      <Printer size={18} />
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
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <span>weightKg : {trip?.weightKg}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <span>volumeM3 : {trip?.volumeM3}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <span>estimatedCost : {trip?.estimatedCost}</span>
                  </div>
                </div>
                <div className="hidden">
                  <Invoice
                    ref={(el) => (invoiceRefs.current[trip._id] = el)}
                    trip={trip}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
