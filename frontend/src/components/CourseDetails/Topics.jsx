import React from "react";

export const Topics = ({ topics }) => {
  return (
    <ul className="py-2">
      {topics?.map((topic) => {
        return (
          <li className="list-disc ml-8" key={topic?.name}>
            {topic?.name}
          </li>
        );
      })}
    </ul>
  );
};
