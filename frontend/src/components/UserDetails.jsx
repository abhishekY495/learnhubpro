import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { deleteUser, logoutUser } from "../features/userSlice";
import { EditDetailsModal } from "./modals/EditDetailsModal";

export const UserDetails = ({ userData }) => {
  const { fullName, email, enrolledCourses, token } = userData;
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const enrolledCourseCount = enrolledCourses?.length;

  const logoutBtnHandler = () => dispatch(logoutUser());
  const deleteAccountBtnHandler = () => dispatch(deleteUser(token));

  return (
    <>
      <EditDetailsModal openModal={openModal} setOpenModal={setOpenModal} />
      <div className="flex flex-col w-[820px] m-auto mt-5 px-8 max-[820px]:w-full">
        <p className="text-lg leading-6">
          <span className="font-bold">Full Name - </span>
          {fullName}
        </p>
        <p className="text-lg leading-6">
          <span className="font-bold">Email - </span>
          {email}
        </p>
        <div className="flex justify-between mt-1">
          <div className="flex gap-1">
            <button
              className="bg-neutral-500 text-white p-1 px-6 font-semibold rounded hover:opacity-95"
              onClick={() => setOpenModal(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white p-1 px-6 font-semibold rounded hover:opacity-95"
              onClick={logoutBtnHandler}
            >
              Logout
            </button>
          </div>
          <button
            className="border border-red-500 text-red-500 p-1 px-6 font-semibold rounded hover:bg-red-500 hover:text-white"
            onClick={deleteAccountBtnHandler}
          >
            Delete
          </button>
        </div>
        <hr className="mt-3 mb-2" />
        <p className="text-3xl font-bold underline mb-4">
          Enrolled Courses ({enrolledCourseCount})
        </p>
      </div>
    </>
  );
};
