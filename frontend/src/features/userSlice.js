import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  register,
  login,
  logout,
  updateUserProfile,
  deleteUserProfile,
  enroll,
  unEnroll,
} from "../services/UserService";

export const registerUser = createAsyncThunk("user/registerUser", register);
export const loginUser = createAsyncThunk("user/loginUser", login);
export const logoutUser = createAsyncThunk("user/logoutUser", logout);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  updateUserProfile
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  deleteUserProfile
);
export const enrollCourse = createAsyncThunk("user/enrollCourse", enroll);
export const unEnrollCourse = createAsyncThunk("user/unEnrollCourse", unEnroll);

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
  //
  enrollLoading: false,
  enrollError: false,
  enrollErrorMessage: null,
  //
  unEnrollLoading: false,
  unEnrollError: false,
  unEnrollErrorMessage: null,
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
      // Logout
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
      // Delete User
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
      })
      // Update user
      .addCase(updateUser.pending, (state, action) => {
        state.updateProfileLoading = true;
        state.updateProfileError = false;
        state.updateProfileErrorMessage = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.updateProfileLoading = false;
        state.updateProfileError = false;
        state.updateProfileErrorMessage = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateProfileErrorMessage = action.payload;
        state.updateProfileError = true;
        state.updateProfileLoading = false;
      })
      // Enroll Course
      .addCase(enrollCourse.pending, (state, action) => {
        state.enrollLoading = true;
        state.enrollError = false;
        state.enrollErrorMessage = null;
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.enrollLoading = false;
        state.enrollError = false;
        state.enrollErrorMessage = null;
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.enrollErrorMessage = action.payload;
        state.enrollError = true;
        state.enrollLoading = false;
      })
      // UnEnroll Course
      .addCase(unEnrollCourse.pending, (state, action) => {
        state.unEnrollLoading = true;
        state.unEnrollError = false;
        state.unEnrollErrorMessage = null;
      })
      .addCase(unEnrollCourse.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.unEnrollLoading = false;
        state.unEnrollError = false;
        state.unEnrollErrorMessage = null;
      })
      .addCase(unEnrollCourse.rejected, (state, action) => {
        state.unEnrollErrorMessage = action.payload;
        state.unEnrollError = true;
        state.unEnrollLoading = false;
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
