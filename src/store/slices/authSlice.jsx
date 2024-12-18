import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '@/app/api/AxiosApis/post';

// Create async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginApi(userData);
      
      // Check if we have a successful response with data
      if (response && response.data) {
        // Store the token if it exists
        const token = response.data.token || response.token;
        if (token) {
          localStorage.setItem('token', token);
        }
        
        return {
          user: response.data || response,
          token: token,
          message: response.message || 'Login successful'
        };
      }
      
      // If we don't have data property, reject with error
      return rejectWithValue({
        message: response.message || 'Login failed. Invalid response format.'
      });
    } catch (error) {
      // Handle API error response
      const errorMessage = 
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Login failed. Please check your credentials.';
      
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
