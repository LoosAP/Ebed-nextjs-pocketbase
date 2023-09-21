"use client";
import { listStyles } from "@/app/style";
import { pb } from "@/utils/pocketbase";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Alert } from "./UI";
import SearchBar from "./UI/Inputs/SearchBar";
import UserListItem from "./UserListItem";
import Pagination from "./orders/Pagination";

const UserManager = ({ privilege }) => {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("created");
  const [sortDirection, setSortDirection] = useState("desc");
  const [totalPages, setTotalPages] = useState(1);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [onRefresh, setOnRefresh] = useState(1);
  const handleRefresh = () => {
    setOnRefresh(onRefresh + 1);
  };

  useEffect(() => {
    const getPage = async () => {
      const records = await pb.collection("users").getList(page, 20, {
        filter: `privilege ~ "%${filter}%" || worker_id ~ "%${filter}%" || firstname ~ "%${filter}%" || lastname ~ "%${filter}%" || id ~ "%${filter}%"`,
        sort: `${sortDirection === "desc" ? "-" : ""}${sort}`,
      });
      setItems(records.items);
      setTotalPages(records.totalPages);
    };
    getPage();
  }, [page, filter, sort, sortDirection, message, onRefresh]);
  const handlePageChange = async (e, pageNum) => {
    setPage(pageNum);
  };
  const handleSort = (sortValue) => {
    if (sortValue === sort) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSort(sortValue);
      setSortDirection("asc");
    }
  };
  return (
    <div className="min-w-[80%]">
      <h1 className="font-bold text-[28px] flex items-center justify-center my-5">
        {privilege === "admin" ? "Felhasználók kezelése" : "Számlák kezelése"}{" "}
      </h1>
      <div className="flex flex-row items-center justify-center">
        <SearchBar
          filter={filter}
          setFilter={setFilter}
          placeholder={"Keresés (Felhasználónév, azonosító...)"}
        />
      </div>
      <li key="items" className={`mt-5 ${listStyles.listHeader}`}>
        <div className="flex flex-row items-center w-[95%] ">
          <div
            className="flex flex-row items-center pr-10 ml-2 basis-2/12 "
            onClick={() => handleSort("id")}
          >
            <p>ID</p>
            <div className={sort === "id" ? "block" : "hidden"}>
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
          <div
            className="flex flex-row items-center pr-10 basis-2/12"
            onClick={() => handleSort("privilege")}
          >
            <p>Szerepkör</p>
            <div className={sort === "privilege" ? "block" : "hidden"}>
              {sortDirection === "asc" ? (
                <ArrowUpIcon className="w-4 " />
              ) : (
                <ArrowDownIcon className="w-4 " />
              )}
            </div>
          </div>
          <div
            className="flex flex-row items-center pr-10 basis-2/12"
            onClick={() => handleSort("balance")}
          >
            <p>Egyenleg</p>
            <div className={sort === "balance" ? "block" : "hidden"}>
              {sortDirection === "asc" ? (
                <ArrowUpIcon className="w-4 " />
              ) : (
                <ArrowDownIcon className="w-4 " />
              )}
            </div>
          </div>
          <div
            className="flex flex-row items-center basis-1/12"
            onClick={() => handleSort("can_login")}
          >
            <p>Beléphet</p>
            <div className={sort === "can_login" ? "block" : "hidden"}>
              {sortDirection === "asc" ? (
                <ArrowUpIcon className="w-4 " />
              ) : (
                <ArrowDownIcon className="w-4 " />
              )}
            </div>
          </div>
        </div>
      </li>
      <UserListItem
        privilege={privilege}
        items={items}
        message={message}
        setMessage={setMessage}
        onRefresh={handleRefresh}
      />
      <Pagination count={totalPages} page={page} onChange={handlePageChange} />
      {message && <Alert message={message} setMessage={setMessage} />}
    </div>
  );
};

export default UserManager;
