import React from "react";
import { useSelector } from "react-redux";

import { UserInfo } from "./UserInfo";
import { EnrolledCourses } from "./EnrolledCourses";

export const UserDetails = () => {
  const {
    userData: { fullName, email, enrolledCourses },
  } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col w-[820px] m-auto mt-5 px-8 max-[820px]:w-full h-screen">
      <UserInfo fullName={fullName} email={email} />
      <hr className="mt-3 mb-2" />
      <EnrolledCourses courses={enrolledCourses} />
    </div>
  );
};
