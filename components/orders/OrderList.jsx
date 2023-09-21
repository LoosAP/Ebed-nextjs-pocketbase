import { listStyles } from "@/app/style";
import { pb } from "@/utils/pocketbase";
import {
  CheckCircledIcon,
  CheckIcon,
  Cross2Icon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import DeleteButton from "../UI/Buttons/DeleteButton";
import SettingsButton from "../UI/Buttons/SettingsButton";

const OrderList = ({
  items,
  prices,
  onDelete,
  onEdit,
  isInThePast,
  message,
  setMessage,
}) => {
  if (!items || items.length === 0) {
    return (
      <p className="flex justify-center mt-2 italic text-red-500">
        Nincs még rendelés
      </p>
    );
  }

  return (
    <ul className="flex flex-col ">
      {items.map((item, index) => (
        <li
          key={item.id}
          className={`${listStyles.list} ${
            index === items.length - 1 ? "rounded-b-md" : ""
          }`}
        >
          <div
            className={`flex flex-col sm:flex-row items-start sm:items-center  w-[85%] `}
          >
            <h2 className="ml-2 basis-1/4">{item.id}</h2>
            <p className="sm:basis-2/12">{item.date.substr(0, 10)}</p>
            <p className="sm:basis-1/12">{item.price}&nbsp;Ft</p>
            <p className="sm:basis-1/12">{item.choices}</p>
            <p className="flex flex-row items-center sm:basis-2/12">
              {item.gy_soup ? <CheckIcon /> : <Cross2Icon />}
            </p>
            <p className="flex flex-row items-center pr-10 sm:basis-2/12">
              {item.takeout ? <CheckIcon /> : <Cross2Icon />}
            </p>
            <p className="flex flex-row items-center pr-10 sm:basis-1/12">
              {item.paid ? <CheckIcon /> : <Cross2Icon />}
            </p>
          </div>
          <div className="flex flex-row items-center   w-[20%]">
            <SettingsButton
              isInThePast={isInThePast}
              item={item}
              prices={prices}
              onEdit={onEdit}
              message={message}
              setMessage={setMessage}
              className={`basis-5/12 ${isInThePast ? "hidden" : ""}`}
            />
            <DeleteButton
              item={item}
              onDelete={onDelete}
              isInThePast={isInThePast}
              message={message}
              setMessage={setMessage}
              className={`basis-5/12 ${isInThePast ? "hidden" : ""}`}
            />
            {item.changed ? (
              <p
                className={`text-xs justify-end flex mr-2 ml-auto text-red-500 ${
                  isInThePast || !item.paid ? "hidden" : ""
                }`}
              >
                <ExclamationTriangleIcon />
              </p>
            ) : (
              <p
                className={`text-xs flex justify-end ml-auto mr-2 text-green-500  ${
                  isInThePast || !item.paid ? "hidden" : ""
                }`}
              >
                <CheckCircledIcon />
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OrderList;
