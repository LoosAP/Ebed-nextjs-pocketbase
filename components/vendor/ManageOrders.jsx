"use client";

import { listStyles } from "@/app/style";
import { pb } from "@/utils/pocketbase";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Alert } from "../UI";
import SetDeleteButton from "../UI/Buttons/SetDeleteButton";
import SetPaidButton from "../UI/Buttons/SetPaidButton";
import SetResetButton from "../UI/Buttons/SetResetButton";
import SearchBar from "../UI/Inputs/SearchBar";
import AllOrderList from "../orders/AllOrderList";
import Pagination from "../orders/Pagination";
import AddNewOrder from "./AddNewOrder";

const ManageOrders = ({ prices }) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [sort, setSort] = useState("created");
  const [sortDirection, setSortDirection] = useState("desc"); //
  const [isPaid, setIsPaid] = useState(false);
  const [filter, setFilter] = useState("");
  const [refresh, setRefresh] = useState(1);
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const onRefresh = () => {
    setRefresh((prev) => prev + 1);
  };
  const handleSelect = (item) => {
    if (selected.some((selectedItem) => selectedItem.id === item.id)) {
      setSelected(
        selected.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      setSelected([...selected, item]);
    }
  };
  const handleDelete = async () => {
    const now = new Date();
    const past = selected.some((item) => {
      const date = new Date(item.date);
      return date < now;
    });
    if (past) {
      setMessage("Nem lehet törölni a múltbeli rendeléseket!");
      return;
    }
    let count = 0;
    const promises = selected.map(async (item) => {
      if (item.paid) {
        const isGuest = item.ordered_by === "";
        if (!isGuest) {
          const user = await pb.collection("users").getOne(item.ordered_by);
          const newBalance = parseInt(user.balance) + parseInt(item.price);
          const updatedBalance = await pb
            .collection("users")
            .update(item.ordered_by, {
              balance: parseInt(newBalance),
            });
        }
      }
      count++;
      const deleteOrder = pb.collection("orders").delete(item.id);
    });
    await Promise.all(promises);
    setSelected([]);
    setMessage(`${count} db rendelés törölve!`);
    onRefresh();
  };
  const handlePaid = async () => {
    let containsPaid = false;
    selected.forEach((item) => {
      if (item.paid) {
        containsPaid = true;
      }
    });
    if (containsPaid) {
      setMessage("Nem lehet kifizetett rendelést újra kifizetni!");
      return;
    }

    const promises = selected.map((item) => {
      return pb.collection("orders").update(item.id, { paid: true });
    });
    await Promise.all(promises);
    setSelected([]);
    onRefresh();
  };
  const handleReset = () => {
    setSelected([]);
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
        filter: `paid = ${isPaid} && (choices ~ "%${filter}%" || date ~ "%${filter}%" || id ~ "%${filter}%" || worker_id ~ "%${filter}%" || firstname ~ "%${filter}%" || lastname ~ "%${filter}%" ) `,
        sort: `${sortDirection === "desc" ? "-" : ""}${sort}`,
        $autoCancel: true,
      });
      setItems(records.items);
      setTotalPages(records.totalPages);
    };
    getPage();
  }, [page, sort, sortDirection, filter, isPaid, refresh]);

  const handlePageChange = async (e, pageNum) => {
    setPage(pageNum);
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    selected.forEach((item) => {
      totalPrice += item.price;
    });

    return totalPrice;
  };

  return (
    <div className="w-[80%]">
      <div className="flex flex-row items-center justify-between">
        <AddNewOrder
          title="Új rendelés hozzáadása helyben (példáúl vendégnek)"
          prices={prices}
          onEdit={onRefresh}
          message={message}
          setMessage={setMessage}
          className={` px-2 py-6 rounded-md text-primary font-bold bg-secondary `}
        >
          Új rendelés hozzáadása
        </AddNewOrder>
        <SearchBar
          filter={filter}
          setFilter={setFilter}
          placeholder="Keresés (A, 2023-..., stb)"
        />
        <div className="flex flex-col items-center justify-between">
          <SetDeleteButton
            className="w-[100px]"
            selected={selected}
            onDelete={handleDelete}
          />
          <SetPaidButton
            className="w-[100px]"
            selected={selected}
            getTotalPrice={getTotalPrice}
            onPaid={handlePaid}
          />
          <SetResetButton
            className="w-[100px]"
            selected={selected}
            onReset={handleReset}
          />
        </div>
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
      <li key="items" className={listStyles.listHeader}>
        <div className="flex flex-row items-center w-[95%] ">
          <div
            className="flex flex-row items-center ml-2 basis-1/6 "
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
            className="flex flex-row items-center basis-1/12"
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
            className="flex flex-row items-center basis-1/12"
            onClick={() => handleSort("gy_soup")}
          >
            <p>GY</p>
            <div className={sort === "gy_soup" ? "block" : "hidden"}>
              {sortDirection === "asc" ? (
                <ArrowUpIcon className="w-4 " />
              ) : (
                <ArrowDownIcon className="w-4 " />
              )}
            </div>
          </div>
          <div
            className="flex flex-row items-center pr-10 basis-1/12"
            onClick={() => handleSort("takeout")}
          >
            <p>E</p>
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
            onClick={() => handleSort("worker_id")}
          >
            <p>Dsz</p>
            <div className={sort === "worker_id" ? "block" : "hidden"}>
              {sortDirection === "asc" ? (
                <ArrowUpIcon className="w-4 " />
              ) : (
                <ArrowDownIcon className="w-4 " />
              )}
            </div>
          </div>
          <div
            className="flex flex-row items-center pr-10 basis-2/12"
            onClick={() => handleSort("firstname")}
          >
            <p>Vezetéknév</p>
            <div className={sort === "firstname" ? "block" : "hidden"}>
              {sortDirection === "asc" ? (
                <ArrowUpIcon className="w-4 " />
              ) : (
                <ArrowDownIcon className="w-4 " />
              )}
            </div>
          </div>
          <div
            className="flex flex-row items-center pr-10 basis-2/12"
            onClick={() => handleSort("lastname")}
          >
            <p>Keresztnév</p>
            <div className={sort === "lastname" ? "block" : "hidden"}>
              {sortDirection === "asc" ? (
                <ArrowUpIcon className="w-4 " />
              ) : (
                <ArrowDownIcon className="w-4 " />
              )}
            </div>
          </div>
        </div>
      </li>
      <AllOrderList
        items={items}
        onRefresh={onRefresh}
        prices={prices}
        selected={selected}
        setSelected={setSelected}
        handleSelect={handleSelect}
      />
      <Pagination count={totalPages} page={page} onChange={handlePageChange} />
      {message && <Alert message={message} setMessage={setMessage} />}
    </div>
  );
};

export default ManageOrders;
