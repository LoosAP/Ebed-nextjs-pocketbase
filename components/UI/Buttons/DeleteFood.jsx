import { TrashIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

const DeleteFood = ({ onDelete, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <div className={`inline-block ${className}`}>
      <button className={`text-red-500 `} onClick={handleOpen}>
        <TrashIcon />
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="p-4 text-center bg-white rounded shadow-lg">
            <h2 className="mb-2 text-lg font-bold">Elem törlése</h2>
            <p className="mb-4">
              Biztos benne hogy kiakarja törölni ezt az elemet?
            </p>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 mr-2 bg-gray-100 border border-gray-400 rounded-md hover:bg-gray-200"
                onClick={handleClose}
              >
                Mégse
              </button>
              <button
                className="px-4 py-2 text-white bg-red-500 border border-red-500 rounded-md hover:bg-red-700"
                onClick={handleDelete}
              >
                Törlés
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteFood;
