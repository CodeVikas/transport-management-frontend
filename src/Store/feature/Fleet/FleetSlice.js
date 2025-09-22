import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFleets,
  createFleet,
  updateFleet,
} from "./FleetThunk.js";
import { toast } from "react-hot-toast";

const fleetslice = createSlice({
  name: "fleets",
  initialState: {
    fleets: [],
    status: "idle",
    error: null,
    selectedFleet: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Fleets
      .addCase(fetchFleets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFleets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fleets = action.payload;
      })
      .addCase(fetchFleets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })

      .addCase(createFleet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createFleet.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Fleet created successfully!");
      })
      .addCase(createFleet.rejected, (state, action) => {
        if (
          action?.error?.message == "Request failed with status code 422" ||
          "Request failed with status code 500"
        ) {
          toast.error("Fleet already exits!");
        } else {
          toast.error("Failed to create Fleet!");
        }
        state.status = "failed";
      })

      .addCase(updateFleet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateFleet.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Fleet updated successfully!");
      })
      .addCase(updateFleet.rejected, (state, action) => {
        state.status = "failed";
        if (
          action?.error?.message ==
            'Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: ownPrepLive.Fleets index: phone_1 dup key: { phone: "9876543210" }' ||
          "Request failed with status code 500"
        ) {
          toast.error("Fleet already exits!");
        } else {
          toast.error("Failed to updated Fleet!");
        }
      });
  },
});

export default fleetslice.reducer;
