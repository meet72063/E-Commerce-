import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, signUp } from "./userApi";
import { addNotification } from "../Notification/notifications";

const initialState = {
  user: null,
  status: "idle",
  errorMsg: "",
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (data, thunkApi) => {
    try {
      const response = await signUp(data);
      thunkApi.dispatch(
        addNotification({
          message: "Signed In Successfully",
          variant: "success",
        })
      );
      return response.data;
    } catch (error) {
      thunkApi.dispatch(
        addNotification({ message: error.response.data.error })
      );
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);
export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (data, thunkApi) => {
    try {
      const response = await login(data);
      thunkApi.dispatch(
        addNotification({
          message: "logged in Successfully",
          variant: "success",
        })
      );
      return response.data;
    } catch (error) {
      thunkApi.dispatch(
        addNotification({ message: error.response.data.error })
      );
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUser: (state) => {
      const user = JSON.parse(localStorage.getItem("userData"));
      if (user) {
        state.user = user;
      }
    },

    loggedOutUser: (state, action) => {
      state.user = null;
      localStorage.removeItem("userData");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("cart");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
        state.errorMsg = "";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        state.errorMsg = "";
        localStorage.setItem("userData", JSON.stringify(action.payload));
        localStorage.setItem("isLoggedIn", true);
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "error";
        state.errorMsg = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
        state.errorMsg = "";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        state.errorMsg = "";
        localStorage.setItem("userData", JSON.stringify(action.payload));
        localStorage.setItem("isLoggedIn", true);
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "error";
        state.errorMsg = action.payload;
      });
  },
});

export const { loggedOutUser, setUser } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
