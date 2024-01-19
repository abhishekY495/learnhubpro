import React from "react";

export const VideoModal = ({ openModal, setOpenModal, videoUrl }) => {
  if (!openModal) return null;
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-neutral-700/50 backdrop-blur-[2px] z-10 transition-none"
      onClick={() => setOpenModal(false)}
    >
      <video
        src={videoUrl}
        controls
        className="rounded-md w-[700px] m-auto mt-[100px]"
        onClick={(e) => e.stopPropagation()}
      ></video>
    </div>
  );
};
