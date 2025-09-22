import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDashboards,
} from "./DashboardThunk";
import { toast } from "react-hot-toast";

const dashboardslice = createSlice({
  name: "dashboards",
  initialState: {
    dashboards: [],
    status: "idle",
    error: null,
    selectedDashboard: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Dashboards
      .addCase(fetchDashboards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDashboards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dashboards = action.payload;
      })
      .addCase(fetchDashboards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })
     
  },
});

export default dashboardslice.reducer;
