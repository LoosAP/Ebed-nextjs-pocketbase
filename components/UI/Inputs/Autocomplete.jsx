"use client";

import { useState } from "react";
import Input from "./Input";

const Autocomplete = ({ label, options, value, onChange }) => {
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const filtered = options.filter((option) =>
      option.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
    onChange(inputValue);
  };

  const handleOptionClick = (option) => {
    setFilteredOptions([]);
    onChange(option);
  };

  return (
    <div className="relative">
      <Input
        label={label}
        value={value}
        onChange={handleInputChange}
        autoComplete="off"
      />
      {filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 shadow-lg rounded-b-md">
          {filteredOptions.map((option) => (
            <li
              key={option}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
