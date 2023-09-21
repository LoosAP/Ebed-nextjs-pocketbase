"use client";

import { pb } from "@/utils/pocketbase";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

import styles, { listStyles } from "@/app/style";
import { addDays, nextFriday, nextMonday } from "date-fns";
import { useEffect, useState } from "react";
import { Alert } from "../UI";
import SearchBar from "../UI/Inputs/SearchBar";
import OrderList from "../orders/OrderList";
import Pagination from "../orders/Pagination";

const MyOrders = ({ id, prices, balance }) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [refresh, setRefresh] = useState(1); // [1
  const [sort, setSort] = useState("created");
  const [sortDirection, setSortDirection] = useState("desc"); //
  const [isPaid, setIsPaid] = useState(false);
  const [filter, setFilter] = useState("");
  const [isInThePast, setIsInThePast] = useState(false);
  const [message, setMessage] = useState("");
  const now = new Date();
  const isMonday = now.getDay() === 1;
  const isBefore9am = now.getHours() < 9;
  const isEndOfWeek =
    now.getDay() === 5 || now.getDay() === 6 || now.getDay() === 0;
  const isTodayValid = now.getHours() < 16;
  const changeableDateHandler = isEndOfWeek
    ? nextMonday(new Date()).toISOString().substring(0, 10)
    : isMonday && isBefore9am
    ? now.toISOString().substring(0, 10)
    : isTodayValid
    ? addDays(new Date(), 1).toISOString().substring(0, 10)
    : addDays(new Date(), 2).toISOString().substring(0, 10);
  const onRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  const handleSort = (sortValue) => {
    if (sortValue === sort) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSort(sortValue);
      setSortDirection("asc");
    }
  };

  const handlePaidFilter = (isPaid) => {
    setIsPaid(isPaid);
    setPage(1);
  };

  useEffect(() => {
    const getPage = async () => {
      const records = await pb.collection("orders").getList(page, 20, {
        filter: `ordered_by = "${id}" && paid = ${isPaid} && date ${
          isInThePast ? "<" : ">"
        } "${changeableDateHandler}" && (choices ~ "%${filter}%" || date ~ "%${filter}%" || id ~ "%${filter}%") `,
        // (choices ~ "%${filter}%" || date ~ "%${filter}%")
        sort: `${sortDirection === "desc" ? "-" : ""}${sort}`,
        $autoCancel: false,
      });
      setItems(records.items);
      setTotalPages(records.totalPages);
    };
    getPage();
  }, [id, page, sort, sortDirection, refresh, filter, isPaid, isInThePast]);

  const handlePageChange = async (e, pageNum) => {
    setPage(pageNum);
  };

  return (
    <div className="sm:w-[80%] w-auto ">
      <div className="flex flex-row items-center justify-between mb-5">
        <div className={`text-black text-[8px] sm:text-[20px]`}>
          Egyenlegem: {balance} Ft
        </div>
        <SearchBar
          filter={filter}
          setFilter={setFilter}
          placeholder="Keresés (A, 2023-..., stb)"
        />

        <button
          className={`px-4 py-2 rounded-full  ${
            isInThePast ? "bg-gray-200 text-gray-500" : "bg-primary text-white"
          }`}
          onClick={() => setIsInThePast(!isInThePast)}
        >
          {isInThePast ? "Múltbeli" : "Jelenlegi"} rendelések
        </button>
      </div>

      <div className="flex flex-row justify-center gap-8 mb-5 ">
        <button
          className={`px-4 py-2 rounded-full ${
            !isPaid ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
          }`}
          onClick={() => handlePaidFilter(false)}
        >
          Fizetésre vár
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            isPaid ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
          }`}
          onClick={() => handlePaidFilter(true)}
        >
          Fizetve
        </button>
      </div>
      <ul>
        <li className={listStyles.listHeader}>
          <div className="flex flex-row items-center  w-[85%] ">
            <div
              className="flex flex-row items-center ml-2 basis-1/4"
              onClick={() => handleSort("id")}
            >
              <p>Rendelés Id</p>
              <div className={sort === "id" ? "block" : "hidden"}>
                {sortDirection === "asc" ? (
                  <ArrowUpIcon className="w-4 " />
                ) : (
                  <ArrowDownIcon className="w-4 " />
                )}
              </div>
            </div>
            <div
              className="flex flex-row items-center basis-2/12"
              onClick={() => handleSort("date")}
            >
              <p>Dátum</p>
              <div className={sort === "date" ? "block" : "hidden"}>
                {sortDirection === "asc" ? (
                  <ArrowUpIcon className="w-4 " />
                ) : (
                  <ArrowDownIcon className="w-4 " />
                )}
              </div>
            </div>
            <div
              className="flex flex-row items-center basis-1/12"
              onClick={() => handleSort("price")}
            >
              <p>Ár</p>
              <div className={sort === "price" ? "block" : "hidden"}>
                {sortDirection === "asc" ? (
                  <ArrowUpIcon className="w-4 " />
                ) : (
                  <ArrowDownIcon className="w-4 " />
                )}
              </div>
            </div>

            <div
              onClick={() => handleSort("choices")}
              className="flex flex-row items-center basis-1/12"
            >
              <p>Menü</p>

              <div className={sort === "choices" ? "block" : "hidden"}>
                {sortDirection === "asc" ? (
                  <ArrowUpIcon className="w-4 " />
                ) : (
                  <ArrowDownIcon className="w-4 " />
                )}
              </div>
            </div>

            <div
              className="flex flex-row items-center basis-2/12"
              onClick={() => handleSort("gy_soup")}
            >
              <p>Gyümölcsleves</p>
              <div className={sort === "gy_soup" ? "block" : "hidden"}>
                {sortDirection === "asc" ? (
                  <ArrowUpIcon className="w-4 " />
                ) : (
                  <ArrowDownIcon className="w-4 " />
                )}
              </div>
            </div>
            <div
              className="flex flex-row items-center pr-10 basis-2/12"
              onClick={() => handleSort("takeout")}
            >
              <p>Elvitel</p>
              <div className={sort === "takeout" ? "block" : "hidden"}>
                {sortDirection === "asc" ? (
                  <ArrowUpIcon className="w-4 " />
                ) : (
                  <ArrowDownIcon className="w-4 " />
                )}
              </div>
            </div>
            <div
              className="flex flex-row items-center pr-10 basis-1/12"
              onClick={() => handleSort("paid")}
            >
              <p>Fizetve</p>
              <div className={sort === "paid" ? "block" : "hidden"}>
                {sortDirection === "asc" ? (
                  <ArrowUpIcon className="w-4 " />
                ) : (
                  <ArrowDownIcon className="w-4 " />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start w-[20%]">
            <p className="basis-5/12">Szerkesztés</p>
            <p className="basis-5/12">Törlés</p>
            <p className="basis-2/12 justify-self-end">&nbsp;</p>
          </div>
        </li>
      </ul>
      <OrderList
        items={items}
        prices={prices}
        onDelete={onRefresh}
        onEdit={onRefresh}
        isInThePast={isInThePast}
        message={message}
        setMessage={setMessage}
      />
      <Pagination count={totalPages} page={page} onChange={handlePageChange} />
      {message && <Alert message={message} setMessage={setMessage} />}
    </div>
  );
};

export default MyOrders;
