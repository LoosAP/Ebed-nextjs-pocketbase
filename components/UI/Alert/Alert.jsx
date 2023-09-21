import { Cross1Icon } from "@radix-ui/react-icons";
import React from "react";

const Alert = ({ message, setMessage }) => {
  return message ? (
    <div className=" fixed flex items-center gap-4 p-4 text-sm text-center text-gray-200 -translate-x-1/2 rounded-md shadow-lg bg-zinc-900 top-4 left-1/2 z-[51]">
      {message}
      <button onClick={() => setMessage("")}>
        <Cross1Icon width={16} height={16} />
      </button>
    </div>
  ) : (
    <></>
  );
};

export default Alert;
