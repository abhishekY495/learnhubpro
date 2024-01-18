import React from "react";

import { Requirements } from "./Requirements";

export const Info = ({ course }) => {
  return (
    <div className="mb-1">
      <p className="text-4xl font-bold pt-2">{course?.title}</p>
      <p className="py-1">{course?.description}</p>
      <div className="border p-2 px-4 mb-2 rounded-md">
        <p>
          <span className="text-lg font-bold">Instructors: </span>
          {course?.instructors?.join(", ")}
        </p>
        <p>
          <span className="text-lg font-bold">Duration: </span>
          {course?.duration}
        </p>
        <Requirements requirements={course?.requirements} />
      </div>
    </div>
  );
};
