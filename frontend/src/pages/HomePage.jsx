import React, { useEffect, useState } from "react";
import axios from "axios";

import { Course } from "../components/Course";
import { Pagination } from "../components/Pagination";
import { Message } from "../components/Message";
import { Shimmer } from "../components/Shimmer";
import { apiUrl } from "../utils/constants";

export const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showMessage, setShowMessage] = useState(
    localStorage.getItem("msg") === "false" ? false : true
  );

  const getCourses = async () => {
    const response = await axios.get(`${apiUrl}/course?page=${pageNumber}`);
    const data = await response.data;
    setCourses(data.courses);
    setNumberOfPages(Math.ceil(data.totalNumberOfCourses / 6));
    setShowMessage(false);
    localStorage.setItem("msg", false);
  };

  useEffect(() => {
    setCourses([]);
    getCourses();
  }, [pageNumber]);

  return (
    <>
      <div className="flex flex-col">
        {showMessage && <Message />}
        {courses?.length === 0 && <Shimmer />}
        {courses?.map((course) => {
          return <Course course={course} key={course?._id} />;
        })}
      </div>
      {numberOfPages && (
        <Pagination
          numberOfPages={numberOfPages}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
        />
      )}
    </>
  );
};
