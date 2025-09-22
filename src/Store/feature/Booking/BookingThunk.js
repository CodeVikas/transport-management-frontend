import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_CONFIG } from "../../../api.ts";

const getToken = () => {
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN");
  return token || null;
};

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async ({ skip = 0, limit = 10, search = "" }, { rejectWithValue }) => {
    const token = getToken();
    const baseUrl = API_CONFIG.baseURL;

    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    try {
      const response = await axios.get(`${baseUrl}/admin/booking`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          skip,
          limit,
          search,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue("Unauthorized");
      }
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const fetchDriverBookings = createAsyncThunk(
  "bookings/fetchDriverBookings",
  async ({ skip = 0, limit = 10, search = "" }, { rejectWithValue }) => {
    const token = getToken();
    const baseUrl = API_CONFIG.baseURL;

    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    try {
      const response = await axios.get(`${baseUrl}/admin/booking/driver`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          skip,
          limit,
          search,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue("Unauthorized");
      }
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const fetchCustomerBookings = createAsyncThunk(
  "bookings/fetchCustomerBookings",
  async ({ skip = 0, limit = 10, search = "" }, { rejectWithValue }) => {
    const token = getToken();
    const baseUrl = API_CONFIG.baseURL;

    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    try {
      const response = await axios.get(`${baseUrl}/admin/booking/customer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          skip,
          limit,
          search,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue("Unauthorized");
      }
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const fetchDeliveredBookings = createAsyncThunk(
  "bookings/fetchDeliveredBookings",
  async ({ skip = 0, limit = 10, search = "" }, { rejectWithValue }) => {
    const token = getToken();
    const baseUrl = API_CONFIG.baseURL;

    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    try {
      const response = await axios.get(`${baseUrl}/admin/booking/delivery/customer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          skip,
          limit,
          search,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue("Unauthorized");
      }
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const createBooking = createAsyncThunk(
  "booking/add",
  async (BookingData) => {
    const token = getToken();
    const baseUrl = API_CONFIG.baseURL;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.post(
      `${baseUrl}/admin/booking/add`,
      BookingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }
);

export const deleteBooking = createAsyncThunk(
  "bookings/delete",
  async (bookingData) => {
    console.log("Deleting booking with ID:", bookingData._id);
    const values = {
      status: !bookingData.status,
    };
    const token = getToken();
    const baseUrl = API_CONFIG.baseURL;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.put(
      `${baseUrl}/admin/booking/delete`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: bookingData._id,
        },
      }
    );

    return response.data;
  }
);

export const fetchByIdBooking = createAsyncThunk(
  "bookings/fetchById",
  async (id) => {
    const token = getToken();
    const baseUrl = API_CONFIG.baseURL;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(
      `${baseUrl}/admin/booking/id`, // Pass id in URL
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: id,
        },
      }
    );

    return response.data;
  }
);

export const updateBooking = createAsyncThunk(
  "booking/update",
  async (BookingData) => {
    const token = getToken();
    const baseUrl = API_CONFIG.baseURL;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.put(
      `${baseUrl}/admin/booking/update`,
      BookingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          id: BookingData.id,
        },
      }
    );

    return response.data;
  }
);

export const makeMyTrip = createAsyncThunk(
  "booking/makeMyTrip",
  async (BookingData) => {
    const token = getToken();
    const baseUrl = API_CONFIG.baseURL;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.put(
      `${baseUrl}/admin/booking/makeMyTrip`,
      BookingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          id: BookingData.id,
        },
      }
    );

    return response.data;
  }
);

export const tripStatusChange = createAsyncThunk(
  "bookings/tripStatusChange",
  async (bookingData) => {
    console.log("Deleting booking with ID:", bookingData);
    const values = {
      tripStatus: bookingData.tripStatus,
    };
    const token = getToken();
    const baseUrl = API_CONFIG.baseURL;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.put(
      `${baseUrl}/admin/booking/tripStatus`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: bookingData.id,
        },
      }
    );

    return response.data;
  }
);
