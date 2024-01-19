import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { EditDetailsModal } from "../Modals/EditDetailsModal.jsx";
import { DeleteAccountModal } from "../Modals/DeleteAccountModal.jsx";
import { logoutUser } from "../../features/userSlice";

export const UserInfo = ({ fullName, email }) => {
  const [editDetailsOpenModal, setEditDetailsOpenModal] = useState(false);
  const [deleteAccountOpenModal, setDeleteAccountOpenModal] = useState(false);
  const dispatch = useDispatch();

  const logoutBtnHandler = () => dispatch(logoutUser());

  return (
    <>
      <EditDetailsModal
        openModal={editDetailsOpenModal}
        setOpenModal={setEditDetailsOpenModal}
      />
      <DeleteAccountModal
        openModal={deleteAccountOpenModal}
        setOpenModal={setDeleteAccountOpenModal}
      />
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
    </>
  );
};
