import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = 'loading';
      state.data = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.status = 'error';
      state.data = null;
    });
  },
});

export const authReducer = authSlice.reducer;
