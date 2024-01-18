import express from "express";

import {
  getCourses,
  getCourse,
  getCourseCount,
} from "../controllers/courseController.js";

export const courseRoutes = express.Router();

courseRoutes.get("/count", getCourseCount);
courseRoutes.get("/", getCourses);
courseRoutes.get("/:id", getCourse);
