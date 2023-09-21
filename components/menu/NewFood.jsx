import { pb } from "@/utils/pocketbase";
import { PlusIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

const NewFoodDialog = ({ isOpen, onClose, onRefresh, status, setStatus }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Soup");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setName("");
    setType("Soup");

    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", name);
    data.append("type", type);

    try {
      const querySnapshot = await pb.collection("food").getList(1, 1, {
        filter: `name = "${name}" && type = "${type}"`,
      });

      if (querySnapshot.items.length > 0) {
        setStatus("Ez az étel már létezik!");
      } else {
        const result = await pb.collection("food").create(data);

        setStatus("Sikeresen mentve!");
        onRefresh();
        setName("");
        onClose();
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus(error.message);
    }
    setLoading(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "block" : "hidden"
      } bg-gray-500 bg-opacity-50`}
    >
      <div className="fixed p-6 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg top-1/2 left-1/2">
        <h2 className="mb-4 text-lg font-medium">Új étel felvétele</h2>
        <button
          type="button"
          className="absolute top-0 right-0 px-4 py-1 text-xl font-bold text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full hover:bg-red-800"
          onClick={handleClose}
        >
          ×
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-medium">
              Megnevezés
            </label>
            <input
              type="text"
              id="text"
              value={name}
              onChange={(event) => {
                const newName = event.target.value;
                setName(newName);
              }}
              className="w-full px-3 py-2 border border-gray-400 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="block mb-2 font-medium">
              Típus
            </label>
            <select
              id="type"
              value={type}
              onChange={(event) => {
                const newType = event.target.value;
                setType(newType);
              }}
              className="w-full px-3 py-2 border border-gray-400 rounded-md"
            >
              <option value="Soup">Leves</option>
              <option value="Normal">Normál</option>
              <option value="E">E</option>
              <option value="Fix">Fix</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 mr-2 bg-gray-100 border border-gray-400 rounded-md hover:bg-gray-200"
              onClick={handleClose}
            >
              Mégse
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-500 border border-green-500 rounded-md hover:bg-green-700"
            >
              {loading ? "Mentés..." : "Mentés"}
            </button>
          </div>
          {/* {status && <p className="mt-4 text-sm text-center">{status}</p>} */}
        </form>
      </div>
    </div>
  );
};

const NewFood = ({ className, onRefresh, status, setStatus }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <button
        title="Új étel hozzáadása"
        onClick={handleOpenDialog}
        className={` ${className}px-4 py-2 my-5 font-bold text-secondary bg-primary border border-dimBrown rounded-md hover:bg-yellow-700  `}
      >
        <div className="flex flex-col items-center justify-between p-1 flex-col-">
          <p>Új étel hozzáadása</p>
          <PlusIcon />
        </div>
      </button>
      <NewFoodDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onRefresh={onRefresh}
        status={status}
        setStatus={setStatus}
      />
    </>
  );
};

export default NewFood;
