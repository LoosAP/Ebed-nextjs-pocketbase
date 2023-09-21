import { listStyles } from "@/app/style";
import { pb } from "@/utils/pocketbase";
import React from "react";
import DeleteFood from "../UI/Buttons/DeleteFood";
import EditFood from "../UI/Buttons/EditFood";

const FoodList = ({ foods, onRefresh, status, setStatus }) => {
  if (!foods || foods.length === 0) {
    return (
      <p className="flex flex-row justify-center font-bold text-red-400">
        Nem létezik ilyen étel
      </p>
    );
  }

  const handleDelete = async (food) => {
    await pb.collection("food").delete(food.id);

    setStatus("Sikeres Törlés!");
    onRefresh();
  };

  return (
    <ul className="flex flex-col">
      {foods.map((food) => (
        <li key={food.id} className={listStyles.list}>
          <div className="flex flex-row items-center ml-2 w-[80%] ">
            <h2 className="basis-1/4">{food.id}</h2>
            <p className="basis-2/3">{food.name}</p>
            <p>{food.type}</p>
          </div>
          <div className="flex flex-row items-center justify-around w-[20%]">
            <EditFood
              food={food}
              onRefresh={onRefresh}
              status={status}
              setStatus={setStatus}
            />
            <DeleteFood onDelete={() => handleDelete(food)} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FoodList;
