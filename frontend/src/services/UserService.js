import axios from "axios";
import toast from "react-hot-toast";

import { apiUrl } from "../utils/constants";

const REGISTER_API_URL = apiUrl + "/api/user/register";
const LOGIN_API_URL = apiUrl + "/api/user/login";
const LOGOUT_API_URL = apiUrl + "/api/user/logout";
const USER_PROFILE_API_URL = apiUrl + "/api/user/profile";

export const register = async (userDetails, { rejectWithValue }) => {
  const toastId = toast.loading("Registering");
  try {
    const response = await axios.post(REGISTER_API_URL, userDetails);
    const user = await response?.data;
    localStorage.setItem("userData", JSON.stringify(user));
    toast.success("Registration Successful", { id: toastId });
    return user;
  } catch (error) {
    toast.error(error?.response?.data?.message, { id: toastId });
    return rejectWithValue(error?.response?.data?.message);
  }
};

export const login = async (userCredentials, { rejectWithValue }) => {
  const toastId = toast.loading("Registering");
  try {
    const response = await axios.post(LOGIN_API_URL, userCredentials);
    const user = await response?.data;
    localStorage.setItem("userData", JSON.stringify(user));
    toast.success("Login Successful", { id: toastId });
    return user;
  } catch (error) {
    toast.error(error?.response?.data?.message, { id: toastId });
    return rejectWithValue(error?.response?.data?.message || error);
  }
};

export const logout = async (_, { rejectWithValue }) => {
  const toastId = toast.loading("Logging Out");
  try {
    await axios.post(LOGOUT_API_URL);
    localStorage.clear();
    toast.success("Logged Out", { id: toastId });
  } catch (error) {
    toast.error("Something went Wrong \n Try again later", { id: toastId });
    return rejectWithValue(error?.response?.data?.message || error);
  }
};

export const getUserProfile = async (jwtToken, { rejectWithValue }) => {
  try {
    const response = await axios.get(USER_PROFILE_API_URL, jwtToken);
    const user = await response?.data;
    localStorage.setItem("userData", JSON.stringify(user));
    return user;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error);
  }
};

export const updateUserProfile = async (jwtToken) => {
  try {
    const response = await axios.get(USER_PROFILE_API_URL, jwtToken);
    const user = response?.data;
    localStorage.setItem("userData", JSON.stringify(user));
    return user;
  } catch (error) {
    return error?.response?.data?.message || error;
  }
};

export const deleteUserProfile = async (token, { rejectWithValue }) => {
  const toastId = toast.loading("Deleting Account");
  try {
    await axios.delete(USER_PROFILE_API_URL, { data: { token } });
    localStorage.clear();
    toast.success("Account Deleted", { id: toastId });
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message, { id: toastId });
    return rejectWithValue(error?.response?.data?.message || error);
  }
};
