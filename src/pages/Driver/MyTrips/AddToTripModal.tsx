import React, { useState } from "react";

const AddToTripModal = ({ isOpen, onClose, booking, onConfirm }) => {
  const [selectedStatus, setSelectedStatus] = useState(booking?.status || "Pending");

  if (!isOpen) return null;

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleConfirm = () => {
    onConfirm({ ...booking, status: selectedStatus });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add to My Trip</h2>
        <p className="mb-4">
          Are you sure you want to add this booking to your trip?
        </p>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Change Status
          </label>
          <select
            id="status"
            value={selectedStatus}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Start Trip">Start Trip</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToTripModal;
