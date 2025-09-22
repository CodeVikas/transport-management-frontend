import React from "react";

const AddToTripModal = ({ isOpen, onClose, booking, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add to My Trip</h2>
        <p className="mb-4">
          Are you sure you want to add this booking to your trip?
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={() => onConfirm(booking)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToTripModal;
