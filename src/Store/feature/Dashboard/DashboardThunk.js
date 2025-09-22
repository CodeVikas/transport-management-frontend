import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_CONFIG } from "../../../api.ts";

const getToken = () => {
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN");
  return token || null;
};

export const fetchDashboards = createAsyncThunk(
  "Dashboards/fetchDashboards",
  async (_, { rejectWithValue }) => {
    const token = getToken();
    const baseUrl = API_CONFIG.baseURL;

    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    try {
      const response = await axios.get(`${baseUrl}/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue("Unauthorized");
      }
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
