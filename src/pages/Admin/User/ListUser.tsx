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
  fetchUsers,
  deleteUser,
} from "../../../Store/feature/User/UserThunk.js";
import DeleteConfirmationModal from "../../../ShareFolder/DialogBox";
import Tooltip from "../../../ShareFolder/Tooltip";
import Loader from "../../../ShareFolder/Loader";
import moment from "moment";

export default function UserListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, statusUsers } = useSelector((state) => state.users);
  console.log("Users from state:", users);
  const userData = users?.data;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (statusUsers === "idle") {
      const skip = (currentPage - 1) * usersPerPage;
      dispatch(
        fetchUsers({
          skip,
          limit: usersPerPage,
          search: searchTerm,
        })
      );
    }
  }, [dispatch, statusUsers, currentPage, usersPerPage, searchTerm]); // Add searchTerm to dependencies

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
    const skip = 0; // Reset skip to 0 since we're going back to first page
    dispatch(
      fetchUsers({
        skip,
        limit: usersPerPage,
        search: e.target.value,
      })
    );
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const skip = (newPage - 1) * usersPerPage;
    dispatch(
      fetchUsers({
        skip,
        limit: usersPerPage,
        search: searchTerm, // Include the current search term
      })
    );
  };

  const handleRowsPerPageChange = (newValue) => {
    const value = parseInt(newValue, 10);
    setUsersPerPage(value);
    setCurrentPage(1); // Reset to first page
    dispatch(
      fetchUsers({
        skip: 0,
        limit: value,
        search: searchTerm, // Include the current search term
      })
    );
  };

  // Pagination Logic
  const totalPages = Math.ceil(users?.total / usersPerPage);
  const handleEdit = (user) => {
    navigate("/admin/user/add", { state: { userId: user?._id } });
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    // dispatch(deleteUser(user)).then(() => {
    //   dispatch(fetchUsers());
    // });
  };

  const confirmDelete = () => {
    console.log("Deleting user:", selectedUser);
    if (selectedUser) {
      dispatch(deleteUser(selectedUser)).then(() => {
        dispatch(fetchUsers({ skip: 0, limit: 10, search: "" }));
        setIsModalOpen(false);
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-2 space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Staff List
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track Staff information
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            onClick={() => navigate("/admin/user/add")}
          >
            <Plus size={18} />
            Add Staff
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
                placeholder="Search Users by name, email, phone ..."
                className="w-full outline-none bg-transparent"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search size={20} className="text-gray-500" />
            </div>
            <p className="text-sm text-gray-500">Total Users: {users.total}</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-sm">
              <tr>
                <th className="px-8 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Staff Info
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
              {statusUsers === "loading" ? (
                <Loader colspan={4} />
              ) : userData?.length > 0 ? (
                userData.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-8 py-5">
                      <div className="flex">
                        <div className="font-medium text-gray-900">Name :</div>
                        <div className="text-sm text-gray-500">
                          {user.fullName || "N/A"}
                        </div>
                      </div>
                      <div className="flex py-2">
                        <div className="font-medium text-gray-900">Email :</div>
                        <div className="text-sm text-gray-500">
                          {user.email || "N/A"}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="font-medium text-gray-900">Phone :</div>
                        <div className="text-sm text-gray-500">
                          {user.phone || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      {user?.createdAt
                        ? moment(user.createdAt).format("ll")
                        : "N/A"}
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status ? "Active" : "Deactivated"}
                      </span>
                    </td>

                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <Tooltip content="Edit">
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <Edit2 size={18} onClick={() => handleEdit(user)} />
                          </button>
                        </Tooltip>
                        <Tooltip content="Change Status">
                          <button
                            className={`text-red-600 hover:text-red-800`}
                            onClick={() => handleDelete(user)}
                          >
                            {user.status ? (
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
              value={usersPerPage}
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
