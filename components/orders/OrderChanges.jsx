"use client";

import { listStyles } from "@/app/style";
import { pb } from "@/utils/pocketbase";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Alert, SetAcceptButton } from "../UI";
import SetResetButton from "../UI/Buttons/SetResetButton";
import SearchBar from "../UI/Inputs/SearchBar";
import ChangedOrdersList from "./ChangedOrdersList";
import Pagination from "./Pagination";

const OrderChanges = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [sort, setSort] = useState("created");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState([]);
  const [refresh, setRefresh] = useState(1);
  const [request_type, setRequest_type] = useState("change");
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

  useEffect(() => {
    const getPage = async () => {
      const records = await pb.collection("orders").getList(page, 20, {
        filter: `paid = true && change_request ~ "%${request_type}%" && changed = true && (choices ~ "%${filter}%" || date ~ "%${filter}%" || id ~ "%${filter}%" || worker_id ~ "%${filter}%" || firstname ~ "%${filter}%" || lastname ~ "%${filter}%" ) `,
        sort: `${sortDirection === "desc" ? "-" : ""}${sort}`,
        $autoCancel: true,
      });
      setItems(records.items);
      setTotalPages(records.totalPages);
    };
    getPage();
  }, [page, sort, sortDirection, filter, refresh, request_type]);

  const handlePageChange = async (e, pageNum) => {
    setPage(pageNum);
  };

  const handlePaidFilter = (request) => {
    setRequest_type(request);
    setPage(1);
  };
  const handleSort = (sortValue) => {
    if (sortValue === sort) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSort(sortValue);
      setSortDirection("asc");
    }
  };
  const handleReset = () => {
    setSelected([]);
  };
  const handleSelectAll = () => {
    const newSelected = items.map((item) => item);
    setSelected(newSelected);
  };
  const handleAccept = async () => {
    try {
      selected.map(async (item) => {
        const requestType = item.change_request.request_type;
        if (requestType === "change") {
          const user = await pb.collection("users").getOne(item.ordered_by);
          const newBalance =
            parseInt(user.balance) +
            parseInt(item.price) -
            parseInt(item.change_request.price);
          const updatedBalance = await pb
            .collection("users")
            .update(item.ordered_by, {
              balance: parseInt(newBalance),
            });
          const updateRecord = pb.collection("orders").update(item.id, {
            date: item.change_request.date,
            choices: item.change_request.choices,
            gy_soup: item.change_request.gy_soup,
            takeout: item.change_request.takeout,
            price: item.change_request.price,
            changed: false,
            change_request: null,
          });
          setMessage("Változtatások elfogadva");
        } else if (requestType === "delete") {
          const user = await pb.collection("users").getOne(item.ordered_by);
          const newBalance = parseInt(user.balance) + parseInt(item.price);
          const updatedBalance = await pb
            .collection("users")
            .update(item.ordered_by, {
              balance: parseInt(newBalance),
            });

          const deleteRecord = pb.collection("orders").delete(item.id);
          setMessage("Elemek törölve");
        }
      });
    } catch (e) {
      setMessage("Hiba történt");

      console.log(e);
    }
    setSelected([]);
    onRefresh();
  };
  return (
    <div className="w-[80%]">
      <div className="flex flex-row items-center justify-between ">
        <SearchBar
          filter={filter}
          setFilter={setFilter}
          placeholder="Keresés (A, 2023-..., stb)"
        />
        <div className="flex flex-col items-center justify-between">
          <SetAcceptButton
            selected={selected}
            onAccept={handleAccept}
            className={`w-[100px]`}
          />
          <div className="inline-block">
            <button
              className={`font-bold px-4 py-2 text-white bg-secondary hover:bg-red-900 rounded-md w-[100px]`}
              onClick={handleSelectAll}
            >
              Összes
            </button>
          </div>
          <SetResetButton
            className="w-[100px]"
            selected={selected}
            onReset={handleReset}
          />
        </div>
      </div>
      <div className="flex flex-row justify-center gap-8 my-5 ">
        <button
          className={`px-4 py-2 rounded-full ${
            request_type === "change"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-500"
          }`}
          onClick={() => handlePaidFilter("change")}
        >
          Változtatás
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            request_type === "delete"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-500"
          }`}
          onClick={() => handlePaidFilter("delete")}
        >
          Törlés
        </button>
      </div>
      <ul>
        <li key={`item-header`} className={listStyles.listHeader}>
          <div className="flex flex-row items-center w-[95%] ">
            <div
              className="flex flex-row items-center ml-2 basis-2/12 "
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
              className="flex flex-row items-center basis-2/12"
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
      </ul>
      <ChangedOrdersList
        items={items}
        onRefresh={onRefresh}
        selected={selected}
        setSelected={setSelected}
        handleSelect={handleSelect}
        filter={filter}
      />

      <Pagination count={totalPages} page={page} onChange={handlePageChange} />
      {message && <Alert message={message} setMessage={setMessage} />}
    </div>
  );
};

export default OrderChanges;
