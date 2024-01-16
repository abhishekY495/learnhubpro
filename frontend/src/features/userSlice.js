import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../services/UserService";

export const registerUser = createAsyncThunk("user/registerUser", register);
export const loginUser = createAsyncThunk("user/loginUser", login);
export const logoutUser = createAsyncThunk("user/logoutUser", logout);
export const getUser = createAsyncThunk("user/getUser", getUserProfile);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  updateUserProfile
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  deleteUserProfile
);

const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || null,
  //
  registerLoading: false,
  registerError: false,
  registerErrorMessage: null,
  //
  loginLoading: false,
  loginError: false,
  loginErrorMessage: null,
  //
  updateProfileLoading: false,
  updateProfileError: false,
  updateProfileErrorMessage: null,
  //
  deleteAccountLoading: false,
  deleteAccountError: false,
  deleteAccountErrorMessage: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state, action) => {
        state.registerLoading = true;
        state.userData = null;
        state.registerError = false;
        state.registerErrorMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.registerLoading = false;
        state.registerError = false;
        state.registerErrorMessage = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerErrorMessage = action.payload;
        state.registerError = true;
        state.registerLoading = false;
        state.registeruserData = null;
      })
      // Login
      .addCase(loginUser.pending, (state, action) => {
        state.loginLoading = true;
        state.userData = null;
        state.loginError = false;
        state.loginErrorMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loginLoading = false;
        state.loginError = false;
        state.loginErrorMessage = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginErrorMessage = action.payload;
        state.loginError = true;
        state.loginLoading = false;
        state.userData = null;
      })
      //  Logout
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.userData = null;
        //
        state.registerLoading = false;
        state.registerError = false;
        state.registerErrorMessage = null;
        //
        state.loginLoading = false;
        state.loginError = false;
        state.loginErrorMessage = null;
        //
        state.updateProfileLoading = false;
        state.updateProfileError = false;
        state.updateProfileErrorMessage = null;
        //
        state.deleteAccountLoading = false;
        state.deleteAccountError = false;
        state.deleteAccountErrorMessage = null;
      })
      //  Delete User
      .addCase(deleteUser.pending, (state, action) => {
        state.deleteAccountLoading = true;
        state.deleteAccountError = false;
        state.deleteAccountErrorMessage = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.userData = null;
        state.deleteAccountLoading = false;
        state.deleteAccountError = false;
        state.deleteAccountErrorMessage = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteAccountErrorMessage = action.payload;
        state.deleteAccountError = true;
        state.deleteAccountLoading = false;
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
