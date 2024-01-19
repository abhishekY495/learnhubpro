import React from "react";

import { EnrolledCourseCard } from "./EnrolledCourseCard";

export const EnrolledCourses = ({ courses }) => {
  return (
    <div>
      <p className="text-3xl font-bold underline mb-4 max-[420px]:text-[26px]">
        Enrolled Courses ({courses?.length})
      </p>
      <div className="grid grid-cols-2 gap-5 max-[500px]:grid-cols-1">
        {courses?.length !== 0 &&
          courses?.map((course) => (
            <EnrolledCourseCard course={course} key={course?._id} />
          ))}
      </div>
    </div>
  );
};
