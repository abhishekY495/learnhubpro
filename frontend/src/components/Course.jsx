import React from "react";
import { Link } from "react-router-dom";

export const Course = ({ course }) => {
  const { _id, thumbnail, title, description, instructors } = course;
  return (
    <Link
      key={_id}
      to={`/course/${_id}`}
      className="w-[1000px] m-auto flex gap-4 border-b py-6 px-8 max-[1020px]:w-full max-[740px]:flex-col max-[740px]:gap-2 hover:bg-neutral-100 transition-all"
    >
      <img
        src={thumbnail}
        className="w-[250px] h-[150px] object-cover rounded max-[850px]:w-[30%] max-[740px]:w-full max-[740px]:h-[250px]"
      />
      <div className="flex flex-col gap-2">
        <p
          className="font-semibold text-2xl w-[510px] truncate max-[815px]:w-[440px] max-[740px]:w-full max-[740px]:whitespace-normal max-[740px]:leading-7"
          title={title}
        >
          {title}
        </p>
        <p className="line-clamp-3">{description}</p>
        <div className="line-clamp-1">
          <span className="font-semibold text-lg">Instructors: </span>
          {instructors?.join(", ")}
        </div>
      </div>
    </Link>
  );
};
