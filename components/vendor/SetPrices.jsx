"use client";

import { pb } from "@/utils/pocketbase";
import React, { useState } from "react";
import { Alert, Avatar, Input, SubmitButton, TextArea } from "../UI";

import Loading from "../UI/Loading";
const SetPrices = ({ priceData }) => {
  const id = "frr1his6oia58zd";

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [priceA, setPriceA] = useState(priceData.price_A);
  const [priceAUpdated, setPriceAUpdated] = useState(false);
  const [priceB, setPriceB] = useState(priceData.price_B);
  const [priceBUpdated, setPriceBUpdated] = useState(false);
  const [priceE, setPriceE] = useState(priceData.price_E);
  const [priceEUpdated, setPriceEUpdated] = useState(false);
  const [price_L1, setPrice_L1] = useState(priceData.price_L1);
  const [price_L1Updated, setPrice_L1Updated] = useState(false);
  const [price_L2, setPrice_L2] = useState(priceData.price_L2);
  const [price_L2Updated, setPrice_L2Updated] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();

    if (priceAUpdated) {
      data.append("price_A", priceA);
    }

    if (priceBUpdated) {
      data.append("price_B", priceB);
    }

    if (priceEUpdated) {
      data.append("price_E", priceE);
    }

    if (price_L1Updated) {
      data.append("price_L1", price_L1);
    }

    if (price_L2Updated) {
      data.append("price_L2", price_L2);
    }

    try {
      const result = await pb.collection("price").update(id, data);

      setStatus("Sikeresen mentve!");
      setPriceAUpdated(false);
      setPriceBUpdated(false);
      setPriceEUpdated(false);
      setPrice_L1Updated(false);
      setPrice_L2Updated(false);
    } catch (error) {
      console.error("Error:", error);
      setStatus(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-between ">
      {priceData && id ? (
        <form
          onSubmit={submitForm}
          className="flex flex-col items-center justify-between "
        >
          <Input
            type="number"
            name="price_A"
            id="price_A"
            label="Ár A"
            placeholder="Ár A"
            value={priceA}
            onChange={(e) => {
              setPriceA(e.target.value);
              if (priceA !== priceData.price_A) {
                setPriceAUpdated(true);
              } else {
                setPriceAUpdated(false);
              }
            }}
          />
          <Input
            type="number"
            name="price_B"
            id="price_B"
            label="Ár B"
            placeholder="Ár B"
            value={priceB}
            onChange={(e) => {
              setPriceB(e.target.value);
              if (priceB !== priceData.price_B) {
                setPriceBUpdated(true);
              } else {
                setPriceBUpdated(false);
              }
            }}
          />
          <Input
            type="number"
            name="price_E"
            id="price_E"
            label="Ár E"
            placeholder="Ár E"
            value={priceE}
            onChange={(e) => {
              setPriceE(e.target.value);
              if (priceE !== priceData.price_E) {
                setPriceEUpdated(true);
              } else {
                setPriceEUpdated(false);
              }
            }}
          />
          <Input
            type="number"
            name="price_L1"
            id="price_L1"
            label="Ár Fix1"
            placeholder="Ár L1"
            value={price_L1}
            onChange={(e) => {
              setPrice_L1(e.target.value);
              if (price_L1 !== priceData.price_L1) {
                setPrice_L1Updated(true);
              } else {
                setPrice_L1Updated(false);
              }
            }}
          />
          <Input
            type="number"
            name="price_L2"
            id="price_L2"
            label="Ár Fix2"
            placeholder="Ár L2"
            value={price_L2}
            onChange={(e) => {
              setPrice_L2(e.target.value);
              if (price_L2 !== priceData.price_L2) {
                setPrice_L2Updated(true);
              } else {
                setPrice_L2Updated(false);
              }
            }}
          />
          <SubmitButton disabled={loading} className="w-full mt-4">
            {loading ? <Loading /> : "Mentés"}
          </SubmitButton>
          {status && <Alert message={status} setMessage={setStatus} />}
        </form>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SetPrices;
