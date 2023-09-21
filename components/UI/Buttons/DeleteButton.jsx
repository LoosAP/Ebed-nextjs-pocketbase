import { pb } from "@/utils/pocketbase";
import { TrashIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

const DeleteButton = ({
  item,
  onDelete,
  className,
  isInThePast,
  message,
  setMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      if (item.paid) {
        const data = new FormData();
        data.append("request_type", "delete");

        setMessage("Törlési kérelem elküldve!");
        const deleteItem = await pb.collection("orders").update(item.id, {
          change_request: JSON.stringify(Object.fromEntries(data)),
          changed: true,
        });
      } else {
        const deleteItem = await pb.collection("orders").delete(item.id);
        setMessage("Elem törölve!");
      }
    } catch (error) {
      setMessage(error.message);
    }
    onDelete();
    setIsOpen(false);
  };

  if (isInThePast) {
    return (
      <div className={`inline-block`}>
        <button
          title="Sor törlése"
          className={`text-red-500  ${className}  `}
          onClick={handleOpen}
        >
          <TrashIcon />
        </button>
        {isOpen && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
            <div className="p-4 text-center bg-white rounded shadow-lg">
              <button
                type="button"
                className="absolute top-0 right-0 px-4 py-1 text-xl font-bold text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full hover:bg-red-800"
                onClick={handleClose}
              >
                ×
              </button>
              <h2 className="mb-2 text-lg font-bold">Elem törlése</h2>
              <p className="mb-4">
                Sajnos a rendelés nem Törölhető, mert a dátum már elmúlt.
              </p>
              <div className="flex justify-center">
                <button
                  className="px-4 py-2 text-white bg-red-500 border border-red-500 rounded-md hover:bg-red-700"
                  onClick={handleClose}
                >
                  Rendben
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-block`}>
      <button
        title="Sor törlése"
        className={`text-red-500  ${className}  `}
        onClick={handleOpen}
      >
        <TrashIcon />
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="p-4 text-center bg-white rounded shadow-lg">
            <h2 className="mb-2 text-lg font-bold">Elem törlése</h2>

            <p className="mb-4">
              Biztos benne hogy kiakarja törölni ezt az elemet?
            </p>
            {item.paid && (
              <p className="text-[14px] mb-2 text-red-500">
                Figyelem! fizetett rendelést csak engedéllyel lehet törölni!
              </p>
            )}
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

export default DeleteButton;
