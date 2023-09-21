"use client";

import { listStyles } from "@/app/style";
import { pb } from "@/utils/pocketbase";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { Alert } from "../UI";
import SearchBar from "../UI/Inputs/SearchBar";
import FoodList from "../menu/FoodList";
import NewFood from "../menu/NewFood";
import Pagination from "../orders/Pagination";

const ManageFoods = () => {
  const [page, setPage] = useState(1);
  const [foods, setFoods] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [sort, setSort] = useState("created");
  const [sortDirection, setSortDirection] = useState("desc");
  const [refresh, setRefresh] = useState(1);
  const [filter, setFilter] = useState("");
  const [status, setStatus] = useState("");
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

  useEffect(() => {
    const getPage = async () => {
      const records = await pb.collection("food").getList(page, 20, {
        sort: sort,
        sort: `${sortDirection === "desc" ? "-" : ""}${sort}`,
        filter: `name ~ "%${filter}%" || id ~ "%${filter}%" || type ~ "%${filter}%"`,
        $autoCancel: true,
      });

      setFoods(records.items);
      setTotalPages(records.totalPages);
    };

    getPage();
  }, [page, sort, sortDirection, filter, refresh]);

  const handlePageChange = async (e, pageNum) => {
    setPage(pageNum);
  };
  return (
    <div className="w-[80%]">
      <div className="flex flex-row items-center justify-between">
        <h1>Ételek kezelése</h1>
        <SearchBar
          setFilter={setFilter}
          placeholder={"Keresés (Gulyásleves, ...)"}
        />
        <NewFood onRefresh={onRefresh} status={status} setStatus={setStatus} />
      </div>
      <ul className="flex flex-col">
        <li key="foodDefiniton" className={listStyles.listHeader}>
          <div className="flex flex-row items-center  w-[80%] ">
            <div
              className="flex flex-row items-center ml-2 basis-1/4 "
              onClick={() => handleSort("id")}
            >
              <p>Étel ID</p>
              <div className={sort === "id" ? "block" : "hidden"}>
                {sortDirection === "asc" ? (
                  <ArrowUpIcon className="w-4 " />
                ) : (
                  <ArrowDownIcon className="w-4 " />
                )}
              </div>
            </div>

            <div
              className="flex flex-row items-center basis-2/3 "
              onClick={() => handleSort("name")}
            >
              <p>Megnevezés</p>
              <div className={sort === "name" ? "block" : "hidden"}>
                {sortDirection === "asc" ? (
                  <ArrowUpIcon className="w-4 " />
                ) : (
                  <ArrowDownIcon className="w-4 " />
                )}
              </div>
            </div>
            <div
              className="flex flex-row items-center "
              onClick={() => handleSort("type")}
            >
              <p>Típus</p>
              <div className={sort === "type" ? "block" : "hidden"}>
                {sortDirection === "asc" ? (
                  <ArrowUpIcon className="w-4 " />
                ) : (
                  <ArrowDownIcon className="w-4 " />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-around w-[20%]">
            <p>Szerkesztés</p>
            <p>Törlés</p>
          </div>
        </li>
      </ul>
      <FoodList
        foods={foods}
        onRefresh={onRefresh}
        status={status}
        setStatus={setStatus}
      />
      <Pagination count={totalPages} page={page} onChange={handlePageChange} />

      {status && <Alert message={status} setMessage={setStatus} />}
    </div>
  );
};

export default ManageFoods;
