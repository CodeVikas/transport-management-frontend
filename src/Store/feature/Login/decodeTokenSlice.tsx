import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const getdecodedtokenToken = () => {
  return localStorage.getItem('LOCAL_STORAGE_TOKEN');
};

const initialState = {
  decodedToken: null,
};

const decodedtokenSlice = createSlice({
  name: 'decodedtoken',
  initialState,
  reducers: {
    setDecodedToken: (state, action) => {
      state.decodedToken = action.payload;
    },
  },
});

export const { setDecodedToken } = decodedtokenSlice.actions;

export const initializedecodedtoken = () => (dispatch) => {
  const token = getdecodedtokenToken();
  if (token) {
    const decoded = jwtDecode(token);
    dispatch(setDecodedToken(decoded));
  }
};

export default decodedtokenSlice.reducer;
