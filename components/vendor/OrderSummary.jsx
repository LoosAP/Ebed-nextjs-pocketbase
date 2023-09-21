"use client";

import styles from "@/app/style";
import { pb } from "@/utils/pocketbase";
import React, { useEffect, useState } from "react";

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersData = await pb
        .collection("orders")
        .getFullList({ filter: `date ~ "%${selectedDate}%"` });

      setOrders(ordersData);
    };

    fetchOrders();
  }, [selectedDate]);

  const totalOrders = orders.length;
  const paidOrders = orders.filter((order) => order.paid).length;
  const aOrders = orders.filter((order) => order.choices.includes("A")).length;
  const bOrders = orders.filter((order) => order.choices.includes("B")).length;
  const eOrders = orders.filter((order) => order.choices.includes("E")).length;
  const l1Orders = orders.filter((order) =>
    order.choices.includes("L1")
  ).length;
  const l2Orders = orders.filter((order) =>
    order.choices.includes("L2")
  ).length;
  const totalPaid = orders.reduce(
    (acc, order) => acc + (order.paid ? order.price : 0),
    0
  );
  const totalUnpaid = orders.reduce(
    (acc, order) => acc + (!order.paid ? order.price : 0),
    0
  );
  const paidAOrders = orders.filter(
    (order) => order.paid && order.choices.includes("A")
  ).length;
  const paidBOrders = orders.filter(
    (order) => order.paid && order.choices.includes("B")
  ).length;
  const paidEOrders = orders.filter(
    (order) => order.paid && order.choices.includes("E")
  ).length;
  const paidL1Orders = orders.filter(
    (order) => order.paid && order.choices.includes("L1")
  ).length;
  const paidL2Orders = orders.filter(
    (order) => order.paid && order.choices.includes("L2")
  ).length;

  const gy_soupOrders = orders.filter((order) => order.gy_soup).length;
  const paidGy_soupOrders = orders.filter(
    (order) => order.paid && order.gy_soup
  ).length;

  const takeoutOrders = orders.filter((order) => order.takeout).length;
  const paidTakeoutOrders = orders.filter(
    (order) => order.paid && order.takeout
  ).length;

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value).toISOString().slice(0, 10));
  };

  return (
    <div className="flex flex-col justify-between items-center w-[90%] ">
      <h2
        className={`font-semibold text-[48px] sm:leading-[40px] leading-[20px]`}
      >
        Rendelések összegzése:
      </h2>
      <div>
        <label
          htmlFor="date"
          className="flex flex-row justify-center mt-4 mb-2"
        >
          Válasszon napot:
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="block w-full px-3 py-2 duration-300 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary "
        />
      </div>
      <div className="mt-8 space-y-4">
        <p className="text-lg font-medium">
          Összes rendelés: <span className="">{totalOrders}</span>
        </p>
        <p className="text-lg font-medium">
          Fizetett rendelés: <span>{paidOrders}</span>
        </p>

        <hr className="my-8 border-1 border-secondary " />
        <div className="space-y-2 ">
          <p className="text-lg font-medium">
            A rendelések: <span>{aOrders}</span> (Fizetve:{" "}
            <span>{paidAOrders}</span>)
          </p>
          <p className="text-lg font-medium">
            B rendelések: <span>{bOrders}</span> (Fizetve:{" "}
            <span>{paidBOrders}</span>)
          </p>
          <p className="text-lg font-medium">
            E rendelések: <span>{eOrders}</span> (Fizetve:{" "}
            <span>{paidEOrders}</span>)
          </p>
          <p className="text-lg font-medium">
            Fix 1 rendelések: <span>{l1Orders}</span> (Fizetve:{" "}
            <span>{paidL1Orders}</span> )
          </p>
          <p className="text-lg font-medium">
            Fix 2 rendelések: <span> {l2Orders}</span> (Fizetve:{" "}
            <span>{paidL2Orders}</span>)
          </p>
          <p className="text-lg font-medium">
            Gyümölcsleveses rendelések: <span> {gy_soupOrders}</span> (Fizetve:{" "}
            <span>{paidGy_soupOrders}</span>)
          </p>
          <p className="text-lg font-medium">
            Elviteles rendelések: <span> {takeoutOrders}</span> (Fizetve:{" "}
            <span>{paidTakeoutOrders}</span>)
          </p>

          <hr className="my-8 border-1 border-secondary " />

          <p className="text-lg font-medium">
            Összes fizetetlen értéke: <span>{totalUnpaid} Ft</span>
          </p>

          <p className="text-lg font-medium">
            Összes fizetett értéke: <span>{totalPaid} Ft</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
