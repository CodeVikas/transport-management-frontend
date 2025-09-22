import React, { forwardRef } from "react";
import moment from "moment";

const Invoice = forwardRef(({ trip }, ref) => {
  return (
    <div ref={ref} className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Invoice</h1>
          <p className="text-sm text-gray-600">#{trip._id}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">
            Date: {moment(trip.bookingDate).format("LL")}
          </p>
          <p className="text-sm text-gray-600">
            Status:{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                trip.tripStatus === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : trip.tripStatus === "In Transit"
                  ? "bg-blue-100 text-blue-800"
                  : trip.tripStatus === "Start Trip"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {trip.tripStatus}
            </span>
          </p>
        </div>
      </div>
      <div className="border-t border-b border-gray-200 py-4 mb-6">
        <div className="flex justify-between mb-2">
          <p className="font-medium">Pickup Location:</p>
          <p>{trip.pickupLocation}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="font-medium">Drop Location:</p>
          <p>{trip.dropLocation}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="font-medium">Cargo Description:</p>
          <p>{trip.cargoDescription}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="font-medium">Driver:</p>
          <p>
            {trip.driver?.fullName} ({trip.driver?.phone})
          </p>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Details</h2>
        <div className="flex justify-between mb-2">
          <p>Weight (kg):</p>
          <p>{trip.weightKg}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Volume (m³):</p>
          <p>{trip.volumeM3}</p>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <p>Estimated Cost:</p>
          <p>${trip.estimatedCost}</p>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500">
        Thank you for your business!
      </div>
    </div>
  );
});

export default Invoice;
