"use client";
import { useState } from "react";

const SetAcceptButton = ({ selected, onAccept, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSetAccept = () => {
    onAccept();
    setIsOpen(false);
  };

  return (
    <div className="inline-block">
      <button
        className={` font-bold px-4 py-2 text-white bg-green-500 rounded-md ${className}  ${
          selected.length === 0
            ? "opacity-50 cursor-default"
            : "hover:bg-green-600 "
        }`}
        onClick={handleOpen}
        disabled={selected.length === 0}
      >
        Elfogad
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="p-4 text-center bg-white rounded shadow-lg">
            <h2 className="mb-2 text-lg font-bold">Elfogadás megerősítése</h2>
            <p className="mb-4">
              Biztos benne, hogy elakarja fogadni a kiválasztott elemeket?
            </p>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 mr-2 bg-gray-100 border border-gray-400 rounded-md hover:bg-gray-200"
                onClick={handleClose}
              >
                Mégse
              </button>
              <button
                className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                onClick={handleSetAccept}
              >
                Elfogad
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetAcceptButton;
