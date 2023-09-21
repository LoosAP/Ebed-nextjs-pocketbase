import { listStyles } from "@/app/style";
import { ArrowRightIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import OrderChecked from "../UI/Buttons/OrderChecked";

const ChangedOrdersList = ({
  items,
  onRefresh,
  selected,
  setSelected,
  handleSelect,
  filter,
}) => {
  if (!items || items.length === 0) {
    if (filter === "") {
      return (
        <p className="flex justify-center mt-2 italic">
          Nincs több elfogadni való rendelés!
        </p>
      );
    } else {
      return (
        <p className="flex justify-center mt-2 italic text-red-500">
          Nincs a keresésre illő tétel!
        </p>
      );
    }
  }
  return (
    <ul className="flex flex-col">
      {items.map((item, index) => (
        <li
          key={item.id}
          className={`${listStyles.list} ${
            index === items.length - 1 ? "rounded-b-md" : ""
          }`}
        >
          {item.change_request.request_type === "change" ? (
            <>
              <div className="flex flex-row items-center py-2  w-[95%] ">
                <h2 className="ml-2 basis-2/12">{item.id}</h2>
                {item.change_request.date.substr(0, 10) ===
                item.date.substr(0, 10) ? (
                  <p className="basis-2/12">
                    {item.change_request.date.substr(0, 10)}
                  </p>
                ) : (
                  <p className="flex flex-row items-center basis-2/12">
                    {item.date.substr(0, 10)}
                    <ArrowRightIcon />
                    {item.change_request.date.substr(0, 10)}
                  </p>
                )}
                {item.change_request.price === item.price ? (
                  <p className="basis-2/12">
                    {item.change_request.price}&nbsp;Ft
                  </p>
                ) : (
                  <p className="flex flex-row items-center basis-2/12">
                    {item.price}
                    <ArrowRightIcon />
                    {item.change_request.price}&nbsp;Ft
                  </p>
                )}
                {item.change_request.choices === item.choices ? (
                  <p className="basis-1/12">{item.change_request.choices}</p>
                ) : (
                  <p className="flex flex-row items-center basis-1/12">
                    {item.choices}
                    <ArrowRightIcon />
                    {item.change_request.choices}
                  </p>
                )}
                {item.change_request.gy_soup.toString() ===
                item.gy_soup.toString() ? (
                  <p className="flex flex-row items-center basis-1/12">
                    {item.gy_soup ? <CheckIcon /> : <Cross2Icon />}
                  </p>
                ) : (
                  <p className="flex flex-row items-center basis-1/12">
                    {item.gy_soup ? <CheckIcon /> : <Cross2Icon />}
                    <ArrowRightIcon />
                    {item.change_request.gy_soup.toString() === "true" ? (
                      <CheckIcon />
                    ) : (
                      <Cross2Icon />
                    )}
                  </p>
                )}
                {item.change_request.takeout.toString() ===
                item.takeout.toString() ? (
                  <p className="flex flex-row items-center basis-1/12">
                    {item.change_request.takeout.toString() === "true" ? (
                      <CheckIcon />
                    ) : (
                      <Cross2Icon />
                    )}
                  </p>
                ) : (
                  <p className="flex flex-row items-center basis-1/12">
                    {item.takeout ? <CheckIcon /> : <Cross2Icon />}
                    <ArrowRightIcon />
                    {item.change_request.takeout.toString() === true ? (
                      <CheckIcon />
                    ) : (
                      <Cross2Icon />
                    )}
                  </p>
                )}

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
            </>
          ) : (
            <>
              <div className="flex flex-row  items-center py-2  w-[95%] ">
                <h2 className="ml-2 basis-2/12">{item.id}</h2>
                <p className="basis-2/12">{item.date.substr(0, 10)}</p>
                <p className="basis-2/12">{item.price}&nbsp;Ft</p>
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
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ChangedOrdersList;
