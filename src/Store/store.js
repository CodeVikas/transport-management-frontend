import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/Login/authSlice";
import userReducer from "./feature/User/UserSlice";
import fleetReducer from "./feature/Fleet/FleetSlice";
import bookingReducer from "./feature/Booking/BookingSlice";
import dashboardReducer from "./feature/Dashboard/DashboardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    fleets: fleetReducer,
    bookings: bookingReducer,
    dashboards: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        // ignoredActions: ['v1/api/login/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.headers"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});

export default store;
