import React, { useState } from "react";

import { Content } from "./Content";
import { Info } from "./Info";

export const CourseDetails = ({ course }) => {
  const [expandAll, setExpandAll] = useState(false);

  const expandAllBtnHandler = () => setExpandAll(!expandAll);

  return (
    <div className="w-[800px] m-auto mt-5 px-2 max-[820px]:w-full max-[820px]:mt-0 max-[820px]:px-0">
      <img
        src={course?.thumbnail}
        alt={course?.title}
        className="w-full object-cover rounded-md max-[820px]:rounded-none"
      />
      <div className="max-[820px]:px-2">
        <Info course={course} />
        <button className="bg-green-500 w-full my-1 py-1 rounded text-xl font-bold text-white hover:bg-green-600 transition-all">
          Enroll
        </button>
        <hr className="mt-2" />
        <div className="flex justify-between items-center">
          <p className="font-bold text-3xl my-2">Content</p>
          <button
            className="text-blue-500 font-semibold underline"
            onClick={expandAllBtnHandler}
          >
            {expandAll ? "Collapse All" : "Expand All"}
          </button>
        </div>
        <div>
          {course?.content?.map((cont) => (
            <Content content={cont} key={cont.week} expandAll={expandAll} />
          ))}
        </div>
      </div>
    </div>
  );
};
