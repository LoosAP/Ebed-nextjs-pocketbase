import { checkLoggedIn } from "@/utils/useUser";
import Image from "next/image";

import React from "react";

const layout = ({ children }) => {
  return (
    <div className="absolute top-0 left-0 z-[60] w-full h-screen overflow-y-auto bg-white">
      <div className="flex flex-col items-center">
        <div className="flex items-center">{children}</div>
      </div>
    </div>
  );
};

export default layout;
