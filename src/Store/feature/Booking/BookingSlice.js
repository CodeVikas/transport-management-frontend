import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBookings,
  createBooking,
  updateBooking,
  makeMyTrip,
  fetchDriverBookings,
  fetchCustomerBookings,
  fetchDeliveredBookings,
} from "./BookingThunk";
import { toast } from "react-hot-toast";

const bookingslice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    driverBookings: [],
    customerBookings: [],
    deliveredBookings: [],
    status: "idle",
    statusBookings: "idle",
    statusCustomerBookings: "idle",
    statusDeliveredBookings: "idle",
    statusDriverBookings: "idle",
    error: null,
    selectedbooking: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Bookings
      .addCase(fetchBookings.pending, (state) => {
        state.statusBookings = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.statusBookings = "succeeded";
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.statusBookings = "failed";
        state.bookings = [];
        state.error = action;
      })

      .addCase(fetchDriverBookings.pending, (state) => {
        state.statusDriverBookings = "loading";
      })
      .addCase(fetchDriverBookings.fulfilled, (state, action) => {
        state.statusDriverBookings = "succeeded";
        state.driverBookings = action.payload;
      })
      .addCase(fetchDriverBookings.rejected, (state, action) => {
        state.statusDriverBookings = "failed";
        state.driverBookings = [];
        state.error = action;
      })

      .addCase(fetchCustomerBookings.pending, (state) => {
        state.statusCustomerBookings = "loading";
      })
      .addCase(fetchCustomerBookings.fulfilled, (state, action) => {
        state.statusCustomerBookings = "succeeded";
        state.customerBookings = action.payload;
      })
      .addCase(fetchCustomerBookings.rejected, (state, action) => {
        state.statusCustomerBookings = "failed";
        state.customerBookings = [];
        state.error = action;
      })

      .addCase(fetchDeliveredBookings.pending, (state) => {
        state.statusDeliveredBookings = "loading";
      })
      .addCase(fetchDeliveredBookings.fulfilled, (state, action) => {
        state.statusDeliveredBookings = "succeeded";
        state.deliveredBookings = action.payload;
      })
      .addCase(fetchDeliveredBookings.rejected, (state, action) => {
        state.statusDeliveredBookings = "failed";
        state.deliveredBookings = [];
        state.error = action;
      })

      .addCase(createBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Booking created successfully!");
      })
      .addCase(createBooking.rejected, (state, action) => {
        if (
          action?.error?.message == "Request failed with status code 422" ||
          "Request failed with status code 500"
        ) {
          toast.error("Booking already exits!");
        } else {
          toast.error("Failed to create Booking!");
        }
        state.status = "failed";
      })

      .addCase(updateBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Booking updated successfully!");
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.status = "failed";
        if (
          action?.error?.message ==
            'Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: ownPrepLive.bookings index: phone_1 dup key: { phone: "9876543210" }' ||
          "Request failed with status code 500"
        ) {
          toast.error("Booking already exits!");
        } else {
          toast.error("Failed to updated Booking!");
        }
      })

      .addCase(makeMyTrip.pending, (state) => {
        state.status = "loading";
      })
      .addCase(makeMyTrip.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Booking updated successfully!");
      })
      .addCase(makeMyTrip.rejected, (state, action) => {
        state.status = "failed";
        if (
          action?.error?.message ==
            'Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: ownPrepLive.bookings index: phone_1 dup key: { phone: "9876543210" }' ||
          "Request failed with status code 500"
        ) {
          toast.error("Booking already exits!");
        } else {
          toast.error("Failed to updated Booking!");
        }
      });
  },
});

export default bookingslice.reducer;
