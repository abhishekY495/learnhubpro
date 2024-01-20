import React from "react";
import { Link } from "react-router-dom";

import { calculatePercentage } from "../../utils/calculatePercentage";

export const EnrolledCourseCard = ({ course }) => {
  const percent = calculatePercentage(course?.content);

  return (
    <Link
      to={`/enrolledcourse/${course?._id}`}
      className="bg-neutral-200 hover:bg-neutral-300 p-2 rounded-md"
      title={course?.title}
    >
      <div className="relative">
        <img
          src={course?.thumbnail}
          alt={course?._title}
          className="w-full object-cover rounded-md"
        />
        <p className="absolute bg-green-500 top-0 right-0 px-2 py-[2xp] font-semibold rounded-bl-sm">
          {percent}%
        </p>
      </div>
      <p className="line-clamp-1 font-semibold mt-1 pl-[2px] text-lg">
        {course?.title}
      </p>
    </Link>
  );
};
