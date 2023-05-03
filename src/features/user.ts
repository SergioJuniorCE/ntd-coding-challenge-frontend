import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../lib/services/UserService";

const userService = new UserService();

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  registered: false,
}

export const register = createAsyncThunk('users/register', async ({ username, password }, thunkAPI) => {
  try {
    const user = userService.register(username, password);
    
    if (user) {
      return user;
    }
    return thunkAPI.rejectWithValue({ message: 'Unable to register', user });

  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue({ message: 'Error while registering user', error });
  }
})


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.registered = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
        state.registered = false;
        state.user = null;
      })
  }
});

export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;