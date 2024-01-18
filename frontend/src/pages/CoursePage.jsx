import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { apiUrl } from "../utils/constants";
import { CourseDetails } from "../components/CourseDetails/CourseDetails";
import { Shimmer } from "../components/CourseDetails/Shimmer";

export const CoursePage = () => {
  const [course, setCourse] = useState(null);
  const { id } = useParams();

  const getCourse = async () => {
    const response = await axios.get(apiUrl + `/course/${id}`);
    setCourse(response?.data);
  };

  useEffect(() => {
    getCourse();
  }, []);

  return course ? <CourseDetails course={course} /> : <Shimmer />;
};
