import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    duration: { type: String, required: true },
    instructors: { type: Array, required: true },
    requirements: { type: Array, required: true },
    syllabus: { type: Array, required: true },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
