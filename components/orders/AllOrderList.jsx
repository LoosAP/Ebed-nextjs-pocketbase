import { listStyles } from "@/app/style";
import { pb } from "@/utils/pocketbase";
import {
  CheckIcon,
  Cross2Icon,
  GearIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import React from "react";
import OrderChecked from "../UI/Buttons/OrderChecked";

const AllOrderList = ({
  items,
  onRefresh,
  prices,
  selected,
  setSelected,
  handleSelect,
}) => {
  if (!items || items.length === 0) {
    return (
      <p className="flex justify-center mt-2 italic text-red-500">
        Nincs még rendelés
      </p>
    );
  }

  const handleDelete = async (item) => {
    await pb.collection("orders").delete(item.id);
    onRefresh();
  };

  return (
    <ul className="flex flex-col ">
      {items.map((item, index) => (
        <li
          key={item.id}
          className={`${listStyles.list} ${
            index === items.length - 1 ? "rounded-b-md" : ""
          }`}
        >
          <div className="flex flex-row items-center py-2  w-[95%] ">
            <h2 className="ml-2 basis-1/6">{item.id}</h2>
            <p className="basis-1/12">{item.date.substr(0, 10)}</p>
            <p className="basis-1/12">{item.price}&nbsp;Ft</p>
            <p className="basis-1/12">{item.choices}</p>
            <p className="flex flex-row items-center basis-1/12">
              {item.gy_soup ? <CheckIcon /> : <Cross2Icon />}
            </p>
            <p className="flex flex-row items-center pr-10 basis-1/12">
              {item.takeout ? <CheckIcon /> : <Cross2Icon />}
            </p>
            <p className="flex flex-row items-center pr-10 basis-1/12">
              {item.worker_id ? item.worker_id : "-"}
            </p>
            <p className="flex flex-row items-center pr-10 basis-2/12">
              {item.firstname ? item.firstname : "-"}
            </p>
            <p className="flex flex-row items-center pr-10 basis-2/12">
              {item.lastname ? item.lastname : "-"}
            </p>
          </div>
          <div className="flex flex-row items-center justify-around w-[5%]">
            <OrderChecked
              item={item}
              onRefresh={onRefresh}
              selected={selected}
              setSelected={setSelected}
              handleSelect={handleSelect}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AllOrderList;
