import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_CONFIG } from "../../../api.ts";
import { toast } from "react-hot-toast";

export const login = createAsyncThunk("v1/api/login", async (credentials) => {
  try {
    const baseUrl = API_CONFIG.baseURL;
    const response = await axios.post(`${baseUrl}/auth/login`, credentials);
    const { headers, ...serializableData } = response.data;
    return serializableData;
  } catch (error) {
    return error.response.data;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        try {
          if (action.payload?.data?.token) {
            localStorage.setItem("LOCAL_STORAGE_TOKEN", action.payload.data.token);
            toast.success("Login successful!");
          } else {
            throw new Error("Token not found in response");
          }
        } catch (error) {
          console.error("Error storing token:", error);
          state.status = "failed";
          state.error = "Failed to store authentication token";
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
