import React from "react";

const SetResetButton = ({ selected, onReset, className }) => {
  return (
    <button
      type="button"
      className={` items-center px-4 py-2 font-bold text-white bg-primary rounded ${className}  ${
        selected.length === 0
          ? "opacity-50 cursor-default"
          : "hover:bg-yellow-700"
      }`}
      onClick={onReset}
      disabled={selected.length === 0}
    >
      Reset
    </button>
  );
};

export default SetResetButton;
