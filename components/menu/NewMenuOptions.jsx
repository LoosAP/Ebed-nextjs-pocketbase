import React from "react";
import Input from "../UI/Inputs/Input";

const NewMenuOptions = ({ options, value, onChange }) => {
  return (
    <div className="flex flex-col w-full gap-3">
      <select
        className="w-[100%] p-4 bg-gray-100 border border-zinc-200 rounded-2xl focus:outline-zinc-300"
        name="option"
        required
        autoComplete="on"
        defaultValue={value}
        onChange={onChange}
      >
        <option value={value} disabled>
          {value}
        </option>
        <option>Üres</option>
        {options.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NewMenuOptions;
