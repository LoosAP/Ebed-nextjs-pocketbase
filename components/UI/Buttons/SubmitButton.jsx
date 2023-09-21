import React from "react";

const SubmitButton = (props) => {
  const { className, children, ...rest } = props;
  return (
    <button
      type="submit"
      className={`bg-secondary rounded-[20px] p-5 text-white text-[22px] font-bold mt-2 hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
