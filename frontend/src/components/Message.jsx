import React from "react";

export const Message = () => {
  return (
    <div className="fixed h-screen w-screen top-2">
      <div className="w-[330px] m-auto text-lg text-center bg-neutral-300 rounded-md">
        <p className="leading-6 py-1 px-3">
          Server is hosted on
          <a
            href="https://render.com"
            target="_blank"
            className="font-semibold text-blue-600 hover:underline transition-all"
          >
            {" "}
            Render
          </a>
          , so it may take some time to start
        </p>
      </div>
    </div>
  );
};
