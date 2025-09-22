import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_CONFIG } from "../../../api.ts";

const getToken = () => {
  const token = localStorage.getItem("LOCAL_STORAGE_TOKEN");
  return token || null;
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ skip = 0, limit = 10, search = "" }, { rejectWithValue }) => {
    const token = getToken();
    const baseUrl = API_CONFIG.baseURL;

    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    try {
      const response = await axios.get(`${baseUrl}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          skip,
          limit,
          search,
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

export const fetchCustomer = createAsyncThunk(
  "users/fetchCustomer",
  async (_, { rejectWithValue }) => {
    const token = getToken();
    const baseUrl = API_CONFIG.baseURL;

    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    try {
      const response = await axios.get(`${baseUrl}/auth/user/customer`, {
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

export const fetchDriver = createAsyncThunk(
  "users/fetchDriver",
  async (_, { rejectWithValue }) => {
    const token = getToken();
    const baseUrl = API_CONFIG.baseURL;

    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    try {
      const response = await axios.get(`${baseUrl}/auth/user/driver`, {
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

export const createUser = createAsyncThunk("user/add", async (UserData) => {
  const token = getToken();
  const baseUrl = API_CONFIG.baseURL;

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await axios.post(`${baseUrl}/auth/register`, UserData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
});

export const deleteUser = createAsyncThunk("users/delete", async (userData) => {
  console.log("Deleting user with ID:", userData._id);
  const values = {
    status: !userData.status,
  };
  const token = getToken();
  const baseUrl = API_CONFIG.baseURL;

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await axios.put(`${baseUrl}/auth/user/delete`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id: userData._id,
    },
  });

  return response.data;
});

export const fetchByIdUser = createAsyncThunk("users/fetchById", async (id) => {
  const token = getToken();
  const baseUrl = API_CONFIG.baseURL;

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await axios.get(
    `${baseUrl}/auth/user/id`, // Pass id in URL
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
});

export const updateUser = createAsyncThunk("user/update", async (UserData) => {
  const token = getToken();
  const baseUrl = API_CONFIG.baseURL;

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await axios.put(`${baseUrl}/auth/user`, UserData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    params: {
      id: UserData.id,
    },
  });

  return response.data;
});
