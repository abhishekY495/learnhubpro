import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import { User } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { hashPassword } from "../utils/hashPassword.js";
import { guestEmail } from "../utils/guestEmail.js";
import { decodeToken } from "../utils/decodeToken.js";

// @route   /api/user/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!(fullName && email && password)) {
    res.status(400);
    throw new Error("Enter All Fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    fullName,
    email,
    password: await hashPassword(password),
    enrolledCourses: [],
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      enrolledCourses: user.enrolledCourses,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route   /api/user/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(400);
    throw new Error("Enter All Fields");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      enrolledCourses: user.enrolledCourses,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Wrong Email or Password");
  }
});

// @route   /api/user/logout
// @access  Public
export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User logged out" });
});

// @route   /api/user/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const decodedToken = decodeToken(req.body.token);
    const user = await User.findById(decodedToken);
    if (user) {
      if (user.email !== guestEmail) {
        user.fullName = req.body.fullName || user.fullName;
        user.email = req.body.email || user.email;
        if (req.body.password) {
          user.password = await hashPassword(req.body.password);
        }
        const updatedUser = await user.save();
        res.status(200).json({
          _id: updatedUser._id,
          fullName: updatedUser.fullName,
          email: updatedUser.email,
          enrolledCourses: updatedUser.enrolledCourses,
          token: generateToken(updatedUser._id),
        });
      } else {
        res.status(404);
        throw new Error("Cannot Update Guest Account");
      }
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(404);
    throw new Error("Cannot Update Guest Account");
  }
});

// @route   /api/user/profile
// @access  Private
export const deleteUserProfile = asyncHandler(async (req, res) => {
  try {
    const decodedToken = decodeToken(req.body.token);
    const user = await User.findById(decodedToken);
    if (user.email !== guestEmail) {
      await User.findByIdAndDelete(decodedToken);
      res.status(200).json({ message: "Account Deleted" });
    } else {
      res.status(400);
      throw new Error("Cannot delete Guest Account");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Cannot delete Guest Account");
  }
});
