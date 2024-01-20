import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ProgressBar } from "./ProgressBar";
import { Content } from "../CourseDetails/Content";
import { unEnrollCourse } from "../../features/userSlice";

export const EnrolledCourseDetails = () => {
  const [expandAll, setExpandAll] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const enrolledCourse = userData?.enrolledCourses?.find(
    (course) => course?._id === id
  );

  const expandAllBtnHandler = () => setExpandAll(!expandAll);

  const unenrollBtnHandler = () => {
    const data = { courseId: enrolledCourse?._id, token: userData?.token };
    dispatch(unEnrollCourse(data));
  };

  useEffect(() => {
    if (!enrolledCourse) {
      navigate("/dashboard");
    }
  }, [enrolledCourse]);

  return (
    <div className="w-[800px] m-auto mt-5 px-2 max-[820px]:w-full max-[820px]:mt-1 mb-[500px]">
      <Link className="flex gap-2" to={`/course/${id}`}>
        <img
          src={enrolledCourse?.thumbnail}
          alt={enrolledCourse?.title}
          className="w-[25%] rounded-md object-cover mt-1 max-[600px]:hidden"
        />
        <div>
          <p className="text-3xl font-bold">{enrolledCourse?.title}</p>
          <button
            className="w-full mt-2 py-1 rounded text-xl font-bold text-white bg-orange-500 hover:bg-orange-600 transition-all"
            onClick={unenrollBtnHandler}
          >
            UN-ENROLL
          </button>
        </div>
      </Link>
      <ProgressBar content={enrolledCourse?.content} />
      <hr className="mt-4 mb-2" />
      <div className="flex justify-between items-center">
        <p className="font-bold text-3xl mb-2">Content</p>
        <button
          className="text-blue-500 font-semibold underline"
          onClick={expandAllBtnHandler}
        >
          {expandAll ? "Collapse All" : "Expand All"}
        </button>
      </div>
      {enrolledCourse?.content?.map((cont) => (
        <Content
          content={cont}
          key={cont.week}
          expandAll={expandAll}
          course={enrolledCourse}
          enrolled={true}
        />
      ))}
    </div>
  );
};
