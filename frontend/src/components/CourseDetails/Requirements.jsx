import React from "react";

export const Requirements = ({ requirements }) => {
  return (
    <>
      <p className="font-bold text-lg">Requirements: </p>
      <ul className="list-disc ml-5">
        {requirements?.map((requirement) => {
          return <li key={requirement}>{requirement}</li>;
        })}
      </ul>
    </>
  );
};
