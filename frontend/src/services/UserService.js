import axios from "axios";
import toast from "react-hot-toast";

import { apiUrl } from "../utils/constants";

const REGISTER_API_URL = apiUrl + "/api/user/register";
const LOGIN_API_URL = apiUrl + "/api/user/login";
const LOGOUT_API_URL = apiUrl + "/api/user/logout";
const USER_PROFILE_API_URL = apiUrl + "/api/user/profile";
const ENROLL_COURSE_API_URL = apiUrl + "/api/user/enroll";
const UNENROLL_COURSE_API_URL = apiUrl + "/api/user/unenroll";
const TOGGLE_TOPIC_API_URL = apiUrl + "/api/user/course";

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
  const toastId = toast.loading("Logging In");
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

export const updateUserProfile = async (userData, { rejectWithValue }) => {
  const toastId = toast.loading("Updating Details");
  try {
    const response = await axios.put(USER_PROFILE_API_URL, userData);
    const user = await response?.data;
    localStorage.setItem("userData", JSON.stringify(user));
    toast.success("Updated Details", { id: toastId });
    return user;
  } catch (error) {
    toast.error(error?.response?.data?.message, { id: toastId });
    return rejectWithValue(error?.response?.data?.message || error);
  }
};

export const deleteUserProfile = async (token, { rejectWithValue }) => {
  const toastId = toast.loading("Deleting Account");
  try {
    await axios.delete(USER_PROFILE_API_URL, { data: { token } });
    localStorage.clear();
    toast.success("Account Deleted", { id: toastId });
  } catch (error) {
    toast.error(error?.response?.data?.message, { id: toastId });
    return rejectWithValue(error?.response?.data?.message || error);
  }
};

export const enroll = async (data, { rejectWithValue }) => {
  const toastId = toast.loading("Enrolling");
  try {
    const response = await axios.post(ENROLL_COURSE_API_URL, data);
    const user = await response?.data;
    localStorage.setItem("userData", JSON.stringify(user));
    toast.success("Enrolled", { id: toastId });
    return user;
  } catch (error) {
    toast.error(error?.response?.data?.message, { id: toastId });
    return rejectWithValue(error?.response?.data?.message || error);
  }
};

export const unEnroll = async (data, { rejectWithValue }) => {
  const toastId = toast.loading("Un-Enrolling");
  try {
    const response = await axios.post(UNENROLL_COURSE_API_URL, data);
    const user = await response?.data;
    localStorage.setItem("userData", JSON.stringify(user));
    toast.success("Un-Enrolled", { id: toastId });
    return user;
  } catch (error) {
    toast.error(error?.response?.data?.message, { id: toastId });
    return rejectWithValue(error?.response?.data?.message || error);
  }
};

export const toggleTopic = async (data, { rejectWithValue }) => {
  let toastId;
  if (data.topicStatus) {
    toastId = toast.loading("Marking as Not Done");
  } else {
    toastId = toast.loading("Marking as Done");
  }
  try {
    const response = await axios.put(TOGGLE_TOPIC_API_URL, data);
    const user = await response?.data;
    localStorage.setItem("userData", JSON.stringify(user));
    if (data.topicStatus) {
      toast.success("Marked as Not Done", { id: toastId });
    } else {
      toast.success("Marked as Done", { id: toastId });
    }
    return user;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return rejectWithValue(error?.response?.data?.message || error);
  }
};
