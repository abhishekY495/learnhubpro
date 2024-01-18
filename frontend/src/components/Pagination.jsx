import React, { useState } from "react";

export const Pagination = ({ numberOfPages, setPageNumber, pageNumber }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumberBtnHandler = (e) => {
    const num = Number(e.target.innerText);
    setPageNumber(num);
    setCurrentPage(num);
  };

  const previousBtnhandler = () => {
    setPageNumber(pageNumber - 1);
    setCurrentPage(pageNumber - 1);
  };
  const nextBtnhandler = () => {
    setPageNumber(pageNumber + 1);
    setCurrentPage(pageNumber + 1);
  };

  return (
    <div className="flex gap-2 justify-center mt-5">
      <button
        className="disabled:cursor-not-allowed"
        onClick={previousBtnhandler}
        disabled={numberOfPages - pageNumber + 1 === numberOfPages}
      >
        ⬅️
      </button>
      {Array(numberOfPages)
        .fill(1)
        .map((_, idx) => {
          return (
            <button
              key={idx}
              className={`bg-neutral-200 px-3 py-1 rounded-full ${
                idx + 1 === currentPage
                  ? "font-semibold bg-neutral-300"
                  : "font-normal"
              }`}
              onClick={pageNumberBtnHandler}
            >
              {idx + 1}
            </button>
          );
        })}
      <button
        className="disabled:cursor-not-allowed"
        onClick={nextBtnhandler}
        disabled={pageNumber === numberOfPages}
      >
        ➡️
      </button>
    </div>
  );
};
