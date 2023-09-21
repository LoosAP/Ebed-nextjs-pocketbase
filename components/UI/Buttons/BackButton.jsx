"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = (props) => {
  const { className, text, ...rest } = props;
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <button
      onClick={handleBack}
      className={`${className} flex flex-row items-center justify-between`}
    >
      {text && <p>{text}</p>}
      <ArrowLeftIcon width={20} height={20} />
    </button>
  );
};

export default BackButton;
