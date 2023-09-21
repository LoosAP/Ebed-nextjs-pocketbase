"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const SearchBar = ({ filter, setFilter, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter(searchTerm);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="drop-shadow-lg shadow-inner justify-between flex items-center gap-4 p-4 border rounded-full sm:w-[600px] w-auto bg-zinc-100 border-zinc-200 focus:border-zinc-400"
    >
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        className=" bg-transparent outline-none sm:w-[550px]"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">
        <MagnifyingGlassIcon
          className={`w-6 h-6 text-gray-500 focus:outline-none`}
        />
      </button>
    </form>
  );
};

export default SearchBar;
