import asyncHandler from "express-async-handler";

import { Course } from "../models/courseModel.js";

export const getCourseCount = asyncHandler(async (req, res) => {
  try {
    const count = await Course.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong \n Try again later");
  }
});

export const getCourses = asyncHandler(async (req, res) => {
  try {
    const page = req.query.page - 1 || 0;
    const coursePerPage = 6;
    const totalNumberOfCourses = await Course.countDocuments();
    const courses = await Course.find({})
      .skip(page * coursePerPage)
      .limit(coursePerPage);
    const result = { totalNumberOfCourses, courses };
    res.status(200).json(result);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong \n Try again later");
  }
});

export const getCourse = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id);
    res.status(200).json(course);
  } catch (error) {
    res.status(500);
    throw new Error("Course not found");
  }
});
