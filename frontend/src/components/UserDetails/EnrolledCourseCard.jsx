import React from "react";
import { Link } from "react-router-dom";

export const EnrolledCourseCard = ({ course }) => {
  return (
    <Link
      to={`/enrolledcourse/${course?._id}`}
      className="bg-neutral-200 hover:bg-neutral-300 p-3 rounded-md"
      title={course?.title}
    >
      <img
        src={course?.thumbnail}
        alt={course?._title}
        className="w-full object-cover rounded-md"
      />
      <p className="line-clamp-1 font-semibold mt-1 text-lg">{course?.title}</p>
    </Link>
  );
};
