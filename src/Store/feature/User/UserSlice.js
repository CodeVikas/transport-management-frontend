import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsers,
  createUser,
  updateUser,
  fetchCustomer,
  fetchDriver,
} from "./UserThunk";
import { toast } from "react-hot-toast";

const userslice = createSlice({
  name: "users",
  initialState: {
    users: [],
    customer: [],
    driver: [],
    status: "idle",
    statusUsers: "idle",
    error: null,
    selectedUser: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.statusUsers = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.statusUsers = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.statusUsers = "failed";
        state.error = action;
      })
      // Fetch customer
      .addCase(fetchCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customer = action.payload;
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.customer=[];
        state.error = action;
      })
      // Fetch fetchDriver
      .addCase(fetchDriver.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDriver.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.driver = action.payload;
      })
      .addCase(fetchDriver.rejected, (state, action) => {
        state.status = "failed";
        state.driver=[];
        state.error = action;
      })

      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("User created successfully!");
      })
      .addCase(createUser.rejected, (state, action) => {
        if (
          action?.error?.message == "Request failed with status code 422" ||
          "Request failed with status code 500"
        ) {
          toast.error("User already exits!");
        } else {
          toast.error("Failed to create User!");
        }
        state.status = "failed";
      })

      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("User updated successfully!");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        if (
          action?.error?.message ==
            'Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: ownPrepLive.users index: phone_1 dup key: { phone: "9876543210" }' ||
          "Request failed with status code 500"
        ) {
          toast.error("User already exits!");
        } else {
          toast.error("Failed to updated User!");
        }
      });
  },
});

export default userslice.reducer;
