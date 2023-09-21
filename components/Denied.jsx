import styles from "@/app/style";
import React from "react";
import BackButton from "./UI/Buttons/BackButton";

const Denied = () => {
  return (
    <div className="flex flex-col items-center justify-between px-10 py-10 mt-10 ">
      <h1 className="text-2xl font-bold text-secondary">
        Önnek nincs jogosultsága megtekinteni ezt az oldalt.
      </h1>

      <BackButton
        text="Vissza"
        className="p-5 rounded-full bg-secondary min-w-[120px] mt-10 text-primary text-md font-bold "
      />
    </div>
  );
};

export default Denied;
