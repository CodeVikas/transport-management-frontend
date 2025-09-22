// ConfirmationModal.js
import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 z-50 bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="mb-4">Are you sure want to logout ?</p>
        <div className="flex justify-center gap-4 ">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
