import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { Content } from "./Content";
import { Info } from "./Info";
import { enrollCourse } from "../../features/userSlice";

export const CourseDetails = ({ course }) => {
  const [expandAll, setExpandAll] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const expandAllBtnHandler = () => setExpandAll(!expandAll);

  const isEnrolled = userData?.enrolledCourses?.some(
    ({ _id }) => course?._id === _id
  );

  const enrollBtnHandler = async () => {
    if (!userData) {
      toast("Login to Enroll");
    } else {
      const data = { course, token: userData?.token };
      dispatch(enrollCourse(data));
    }
  };

  return (
    <div className="w-[800px] m-auto mt-5 px-2 max-[820px]:w-full max-[820px]:mt-0 max-[820px]:px-0">
      <img
        src={course?.thumbnail}
        alt={course?.title}
        className="w-full object-cover rounded-md max-[820px]:rounded-none"
      />
      <div className="max-[820px]:px-2 flex flex-col">
        <Info course={course} />
        {isEnrolled ? (
          <Link
            to={`/enrolledcourse/${course?._id}`}
            className="text-center my-1 py-1 rounded text-xl font-bold text-white bg-orange-500 hover:bg-orange-600 transition-all"
          >
            Go To Course
          </Link>
        ) : (
          <button
            className="w-full my-1 py-1 rounded text-xl font-bold text-white bg-green-500 hover:bg-green-600 transition-all"
            onClick={enrollBtnHandler}
          >
            ENROLL
          </button>
        )}
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
