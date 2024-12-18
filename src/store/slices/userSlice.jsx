import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersApi } from "@/app/api/AxiosApis/post";

// Create async thunk for getting users
export const getUsers = createAsyncThunk(
  "auth/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUsersApi();
      
      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch users.";
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
