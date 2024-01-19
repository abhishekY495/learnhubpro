import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteUser } from "../../features/userSlice";

export const DeleteAccountModal = ({ openModal, setOpenModal }) => {
  const {
    userData: { token },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deleteBtnHandler = () => dispatch(deleteUser(token));

  if (!openModal) return null;
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-neutral-700/50 backdrop-blur-[2px] z-10 transition-none"
      onClick={() => setOpenModal(false)}
    >
      <div
        className="flex flex-col gap-4 bg-neutral-200 text-black w-[400px] m-auto mt-[80px] p-5 rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-neutral-300">
          <p className="font-semibold text-3xl">Are you sure ?</p>
          <button
            className="bg-neutral-300 rounded-full p-1 px-[10px] mb-2 hover:cursor-pointer hover:bg-neutral-400/50 transition-all"
            onClick={() => setOpenModal(false)}
          >
            ⨉
          </button>
        </div>
        <p>
          This cannot be undone. All your details and progress will be lost
          forever.
        </p>
        <button
          onClick={deleteBtnHandler}
          className="bg-red-600 text-2xl text-white py-1 rounded-md hover:bg-red-700 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
