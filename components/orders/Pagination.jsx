import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import React from "react";

const Pagination = ({ count, page, onChange }) => {
  const handlePageChange = (pageNum) => {
    onChange(null, pageNum);
  };

  const pages = [];
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(count, page + 2);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <li
        key={i}
        className={`border px-4 py-2 rounded-md ${
          i === page
            ? "bg-primary text-white"
            : "bg-white hover:bg-primary hover:text-white"
        }`}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </li>
    );
  }

  if (startPage > 1) {
    pages.unshift(
      <li key="start-ellipsis" className="px-4 py-2 border rounded-md">
        <span className="text-gray-500">...</span>
      </li>
    );
  }

  if (endPage < count) {
    pages.push(
      <li key="end-ellipsis" className="px-4 py-2 border rounded-md">
        <span className="text-gray-500">...</span>
      </li>
    );
  }

  const hasNextPage = page < count;
  const hasPrevPage = page > 1;
  const prevPage = page - 1;
  const nextPage = page + 1;

  return (
    <div className="flex flex-row justify-center">
      <ul className="flex flex-row pt-10">
        <button
          className={`px-4 py-2 rounded-md border-primary w-[40px] h-[40px] bg-primary hover:bg-yellow-800 transition-colors duration-300 ${
            !hasPrevPage && "hidden"
          }`}
          onClick={() => handlePageChange(prevPage)}
        >
          <ChevronLeftIcon className="w-5 h-5 p-1 text-white" />
        </button>
        {pages}
        <button
          className={`px-4 py-2 rounded-md h-[40px] w-[40px] border-primary bg-primary hover:bg-yellow-800 transition-colors duration-300 ${
            !hasNextPage && "hidden"
          }`}
          onClick={() => handlePageChange(nextPage)}
        >
          <ChevronRightIcon className="w-5 h-5 p-1 text-white" />
        </button>
      </ul>
    </div>
  );
};

export default Pagination;
