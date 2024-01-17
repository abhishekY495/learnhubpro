import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { isValidEmail } from "../../utils/isValidMail";
import { updateUser } from "../../features/userSlice";

export const EditDetailsModal = ({ openModal, setOpenModal }) => {
  const { userData } = useSelector((state) => state.user);
  const [fullName, setFullName] = useState(userData.fullName);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const closeModal = () => {
    setOpenModal(false);
    setFullName(userData.fullName);
    setEmail(userData.email);
    setPassword("");
  };

  const updateBtnHandler = () => {
    if (fullName.trim().length === 0) {
      toast.error("Full Name cannot be empty");
    } else if (email.trim().length === 0) {
      toast.error("Email cannot be empty");
    } else if (!isValidEmail(email)) {
      toast.error("Invalid Email format");
    } else {
      if (password.trim().length > 0) {
        const newUserData = {
          token: userData.token,
          fullName,
          email,
          password,
        };
        dispatch(updateUser(newUserData));
        closeModal();
      } else {
        const newUserData = {
          token: userData.token,
          fullName,
          email,
        };
        dispatch(updateUser(newUserData));
        closeModal();
      }
    }
  };

  if (!openModal) return null;
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-neutral-700/50 backdrop-blur-[2px] z-10 transition-none"
      onClick={closeModal}
    >
      <div
        className="flex flex-col gap-4 bg-neutral-200 text-black w-[400px] m-auto mt-[80px] p-5 rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-neutral-300">
          <p className="font-semibold text-4xl">Edit Details</p>
          <button
            className="bg-neutral-300 rounded-full p-1 px-[10px] mb-2 hover:cursor-pointer hover:bg-neutral-400/50 transition-all"
            onClick={closeModal}
          >
            ⨉
          </button>
        </div>
        <label>
          <p className="font-semibold">
            Full Name <sup className="text-red-500">*</sup>
          </p>
          <input
            type="text"
            className="w-full rounded-md pl-2 py-1 border-2 focus:outline-none focus:border-neutral-400"
            defaultValue={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>
        <label>
          <p className="font-semibold">
            Email <sup className="text-red-500">*</sup>
          </p>
          <input
            type="text"
            className="w-full rounded-md pl-2 py-1 border-2 focus:outline-none focus:border-neutral-400"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p className="font-semibold">Password</p>
          <input
            type="text"
            className="w-full rounded-md pl-2 py-1 border-2 focus:outline-none focus:border-neutral-400"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Fill to update the password"
          />
        </label>
        <div className="flex gap-1">
          <button
            className="bg-blue-300 w-full py-1 font-semibold rounded-md hover:bg-blue-400 transition-all"
            onClick={updateBtnHandler}
          >
            Update
          </button>
          <button
            className="bg-neutral-300 w-full py-1 font-semibold rounded-md hover:bg-neutral-400 transition-all"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
