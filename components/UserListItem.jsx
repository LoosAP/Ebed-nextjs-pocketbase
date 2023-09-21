import { listStyles } from "@/app/style";
import { pb } from "@/utils/pocketbase";
import {
  CheckIcon,
  Cross1Icon,
  Cross2Icon,
  GearIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import SetUserData from "./UI/Buttons/SetUserData";
const UserListItem = ({ items, privilege, message, setMessage, onRefresh }) => {
  if (!items || items.length === 0) {
    return (
      <p className="flex justify-center mt-2 italic text-red-500">
        Nincs ilyen felhasználó!
      </p>
    );
  }

  const handleBalanceChange = async (e, item) => {
    const newBalance = e.target.value;

    await pb.collection("users").update(item.id, { balance: newBalance });
  };

  const handleCanLoginChange = async (item) => {
    const newCanLogin = !canLogin;

    await pb.collection("users").update(item.id, { can_login: newCanLogin });
  };

  const handlePrivilegeChange = async (e, item) => {
    const newPrivilege = e.target.value;

    await pb.collection("users").update(item.id, { privilege: newPrivilege });
  };

  const handleWorkerIdChange = async (e, item) => {
    const newWorkerId = e.target.value;

    await pb.collection("users").update(item.id, { worker_id: newWorkerId });
  };

  const handleDelete = async (item) => {
    await pb.collection("users").delete(item.id);
  };

  return (
    <ul className="flex flex-col">
      {items?.map((item, index) => (
        <li
          key={item.id}
          className={`${listStyles.list} ${
            index === items.length - 1 ? "rounded-b-md" : ""
          }`}
        >
          <div className="flex flex-row items-center py-2 w-auto sm:w-[95%]">
            <h2 className="pr-10 sm:ml-2 sm:basis-2/12">{item.id}</h2>
            <p className="pr-10 sm:basis-1/12">
              {item.worker_id === "" ? "-" : item.worker_id}
            </p>
            <p className="pr-10 sm:basis-2/12">{item.firstname}</p>
            <p className="pr-10 sm:basis-2/12">{item.lastname}</p>
            <p className="pr-10 sm:basis-2/12">{item.privilege}</p>
            <p className="pr-10 sm:basis-2/12">{item.balance}</p>
            <p className="pr-10 sm:basis-1/12">
              {item.can_login ? <CheckIcon /> : <Cross2Icon />}
            </p>
          </div>
          <div className="flex flex-row items-center justify-center w-[5%]">
            <SetUserData
              className="w-full h-full"
              item={item}
              privilege={privilege}
              message={message}
              setMessage={setMessage}
              onRefresh={onRefresh}
            >
              <GearIcon />
            </SetUserData>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserListItem;
