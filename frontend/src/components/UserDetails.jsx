import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../features/userSlice";
import { EditDetailsModal } from "./modals/EditDetailsModal";
import { DeleteAccountModal } from "./modals/DeleteAccountModal";
import { EnrolledCourseCard } from "./EnrolledCourseCard";

export const UserDetails = () => {
  const {
    userData: { fullName, email, enrolledCourses },
  } = useSelector((state) => state.user);
  const [editDetailsOpenModal, setEditDetailsOpenModal] = useState(false);
  const [deleteAccountOpenModal, setDeleteAccountOpenModal] = useState(false);
  const dispatch = useDispatch();

  const logoutBtnHandler = () => dispatch(logoutUser());

  return (
    <>
      {editDetailsOpenModal && (
        <EditDetailsModal
          openModal={editDetailsOpenModal}
          setOpenModal={setEditDetailsOpenModal}
        />
      )}
      <DeleteAccountModal
        openModal={deleteAccountOpenModal}
        setOpenModal={setDeleteAccountOpenModal}
      />
      <div className="flex flex-col w-[820px] m-auto mt-5 px-8 max-[820px]:w-full h-screen">
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
              onClick={() => setEditDetailsOpenModal(true)}
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
            onClick={() => setDeleteAccountOpenModal(true)}
          >
            Delete
          </button>
        </div>
        <hr className="mt-3 mb-2" />
        <div>
          <p className="text-3xl font-bold underline mb-4 max-[420px]:text-[26px]">
            Enrolled Courses ({enrolledCourses?.length})
          </p>
          <div className="grid grid-cols-2 gap-5 max-[500px]:grid-cols-1">
            {enrolledCourses.length !== 0 &&
              enrolledCourses?.map((course) => (
                <EnrolledCourseCard course={course} key={course?._id} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
