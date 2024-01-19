import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import doneIcon from "../../assets/topic/doneIcon.png";
import unDoneIcon from "../../assets/topic/undoneIcon.png";
import { toggleMarkAsDoneTopic } from "../../features/userSlice";
import { VideoModal } from "../Modals/VideoModal";

export const Topics = ({ topics, course, week }) => {
  const { userData } = useSelector((state) => state.user);
  const [videoModal, setVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();

  const toggleTopic = (topicName) => {
    const data = {
      token: userData.token,
      courseId: course._id,
      week,
      topicName,
    };
    dispatch(toggleMarkAsDoneTopic(data));
  };

  const videoUrlHandler = (url) => {
    setVideoUrl(url);
    setVideoModal(true);
  };

  return (
    <>
      {videoModal && (
        <VideoModal
          openModal={videoModal}
          setOpenModal={setVideoModal}
          videoUrl={videoUrl}
        />
      )}
      <ul className="py-2">
        {topics?.map((topic) => {
          return userData ? (
            <div
              className="flex items-center gap-2 ml-5 hover:cursor-pointer"
              key={topic?.name}
            >
              <img
                src={topic?.markAsDone ? doneIcon : unDoneIcon}
                alt={topic?.markAsDone ? "done" : "unDone"}
                className="w-5 hover:cursor-pointer"
                onClick={() => toggleTopic(topic?.name)}
              />
              <p
                className={topic?.markAsDone ? "line-through" : null}
                onClick={() => videoUrlHandler(topic?.videoUrl)}
              >
                {topic?.name}
              </p>
            </div>
          ) : (
            <li className="list-disc ml-8" key={topic?.name}>
              {topic?.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};
