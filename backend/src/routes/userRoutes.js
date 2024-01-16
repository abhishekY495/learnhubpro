import express from "express";

import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/userController.js";

export const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);
userRoutes
  .route("/profile")
  .get(getUserProfile)
  .put(updateUserProfile)
  .delete(deleteUserProfile);
