import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import { User } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { hashPassword } from "../utils/hashPassword.js";
import { guestEmail } from "../utils/guestEmail.js";
import { decodeToken } from "../utils/decodeToken.js";

// api/user/register
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

// api/user/login
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

// api/user/logout
export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User logged out" });
});

// api/user/profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { token, fullName, email, password } = req.body;

  if (!token) {
    res.status(400);
    throw new Error("Not Authorized, No Token");
  }

  if (!(fullName || email || password)) {
    res.status(400);
    throw new Error("Provide Data to Update");
  }

  if (fullName || email || password) {
    const decodedToken = decodeToken(token);
    const user = await User.findById(decodedToken);

    if (!user) {
      res.status(400);
      throw new Error("Not Authorized");
    }

    if (user.email === guestEmail) {
      res.status(400);
      throw new Error("Cannot Update Guest Account");
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;

    if (password) {
      user.password = await hashPassword(password);
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      enrolledCourses: updatedUser.enrolledCourses,
      token: generateToken(updatedUser._id),
    });
  }
});

// api/user/profile
export const deleteUserProfile = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(400);
    throw new Error("Not Authorized, No Token");
  }

  const _id = decodeToken(token);
  const user = await User.findById(_id);

  if (!user) {
    res.status(400);
    throw new Error("Not Authorized");
  }

  if (user.email === guestEmail) {
    res.status(400);
    throw new Error("Cannot Delete Guest Account");
  } else {
    await User.deleteOne({ _id });
    res.status(200).json({ message: "Account Deleted" });
  }
});

// api/user/course/enroll
export const enrollCourse = asyncHandler(async (req, res) => {
  const { course, token } = req.body;

  if (!token) {
    res.status(404);
    throw new Error("Not Authorized, No Token");
  }
  if (!course) {
    res.status(404);
    throw new Error("No Course to Enroll");
  }

  if (token && course) {
    const id = decodeToken(token);
    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      throw new Error("Not Authorized");
    }

    // Already Enrolled Check
    const courseEnrolledCheck = user.enrolledCourses.some(
      ({ _id }) => _id === course._id
    );
    if (courseEnrolledCheck) {
      res.status(404);
      throw new Error("Already Enrolled");
    }

    if (user && !courseEnrolledCheck) {
      user.enrolledCourses = [...user.enrolledCourses, course];
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        enrolledCourses: updatedUser.enrolledCourses,
        token: generateToken(updatedUser._id),
      });
    }
  }
});

// api/user/course/unenroll
export const unenrollCourse = asyncHandler(async (req, res) => {
  const { courseId, token } = req.body;

  if (!token) {
    res.status(404);
    throw new Error("Not Authorized, No Token");
  }
  if (!courseId) {
    res.status(404);
    throw new Error("No CourseId found");
  }

  if (token && courseId) {
    const id = decodeToken(token);
    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      throw new Error("Not Authorized");
    }

    const courseExistsCheck = user.enrolledCourses.some(
      ({ _id }) => _id === courseId
    );
    if (!courseExistsCheck) {
      res.status(404);
      throw new Error("No such course found");
    }

    if (user && courseExistsCheck) {
      user.enrolledCourses = user.enrolledCourses.filter(
        ({ _id }) => _id !== courseId
      );
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        enrolledCourses: updatedUser.enrolledCourses,
        token: generateToken(updatedUser._id),
      });
    }
  }
});

// api/user/course/topic
export const toggleMarkAsDoneTopic = asyncHandler(async (req, res) => {
  const { token, courseId, week, topicName } = req.body;

  if (!token) {
    res.status(400);
    throw new Error("Not Authorized, No Token");
  }

  if (!(courseId && week && topicName)) {
    res.status(400);
    throw new Error("Provide Data to Mark as Done/UnDone");
  }

  const id = decodeToken(token);
  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error("Not Authorized");
  }

  user.enrolledCourses = user.enrolledCourses.map((course) => {
    if (course._id === courseId) {
      course.content[week - 1].topics = course.content[week - 1].topics.map(
        (topic) =>
          topic.name === topicName
            ? { ...topic, markAsDone: !topic.markAsDone }
            : topic
      );
    }
    return course;
  });

  user.markModified("enrolledCourses");
  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    fullName: updatedUser.fullName,
    email: updatedUser.email,
    enrolledCourses: updatedUser.enrolledCourses,
    token: generateToken(updatedUser._id),
  });
});
