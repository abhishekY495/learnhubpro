import React from "react";

export const Shimmer = () => {
  return (
    <div className="w-[800px] m-auto mt-5 px-2 max-[820px]:w-full max-[820px]:mt-0 max-[820px]:px-0 mb-[500px]">
      <div className="animate-shimmer-ui h-[440px] rounded-md max-[820px]:rounded-none"></div>
      <div className="max-[820px]:px-2">
        <div className="mb-1">
          <p className="text-4xl font-bold pt-2 h-[25px] animate-shimmer-ui mt-4 rounded-md"></p>
          <div className="py-1 flex flex-col gap-1 mt-3 mb-2">
            <p className="animate-shimmer-ui h-[18px] rounded-md"></p>
            <p className="animate-shimmer-ui h-[18px] rounded-md"></p>
            <p className="animate-shimmer-ui h-[18px] rounded-md w-[50%]"></p>
          </div>
          <div className="border p-2 px-4 mb-2 rounded-md h-[120px] animate-shimmer-ui"></div>
        </div>
      </div>
    </div>
  );
};
