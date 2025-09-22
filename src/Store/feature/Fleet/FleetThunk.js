import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_CONFIG } from "../../../api.ts";

const getToken = () => {
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN");
  return token || null;
};

export const fetchFleets = createAsyncThunk(
  "fleets/fetchFleets",
  async ({ skip = 0, limit = 10, search = "" }, { rejectWithValue }) => {
    const token = getToken();
    const baseUrl = API_CONFIG.baseURL;

    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    try {
      const response = await axios.get(`${baseUrl}/admin/fleet`, {
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

export const createFleet = createAsyncThunk("fleet/add", async (FleetData) => {
  const token = getToken();
  const baseUrl = API_CONFIG.baseURL;

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await axios.post(`${baseUrl}/admin/fleet/add`, FleetData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
});

export const deleteFleet = createAsyncThunk(
  "fleets/delete",
  async (fleetData) => {
    console.log("Deleting fleet with ID:", fleetData._id);
    const values = {
      status: !fleetData.status,
    };
    const token = getToken();
    const baseUrl = API_CONFIG.baseURL;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.put(`${baseUrl}/admin/fleet/delete`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: fleetData._id,
      },
    });

    return response.data;
  }
);

export const fetchByIdFleet = createAsyncThunk(
  "fleets/fetchById",
  async (id) => {
    const token = getToken();
    const baseUrl = API_CONFIG.baseURL;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(
      `${baseUrl}/admin/fleet/id`, // Pass id in URL
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

export const updateFleet = createAsyncThunk(
  "fleet/update",
  async (FleetData) => {
    const token = getToken();
    const baseUrl = API_CONFIG.baseURL;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.put(`${baseUrl}/admin/fleet/update`, FleetData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        id: FleetData.id,
      },
    });

    return response.data;
  }
);
