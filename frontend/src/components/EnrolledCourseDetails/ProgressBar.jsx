import React from "react";

import { calculatePercentage } from "../../utils/calculatePercentage";

export const ProgressBar = ({ content }) => {
  const percent = calculatePercentage(content);

  return (
    <div className="my-2">
      <p className="font-bold text-2xl">{percent}% Completed</p>
      <div className="w-[100%] border rounded-full">
        <div
          className="bg-green-500 h-[20px] rounded-full"
          style={{ width: percent + "%" }}
        ></div>
      </div>
    </div>
  );
};
