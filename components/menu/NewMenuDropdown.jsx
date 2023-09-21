import { pb } from "@/utils/pocketbase";
import React, { useEffect, useState } from "react";
import NewMenuOptions from "./NewMenuOptions";

const CACHE_DURATION = 1 * 60 * 1000; // 1 minute

const NewMenuDropdown = ({ foodType, value, onChange }) => {
  pb.autoCancellation(false);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const cachedData = JSON.parse(localStorage.getItem("foodOptions")) || {};

    if (
      cachedData[foodType] &&
      Date.now() - cachedData[foodType].timestamp < CACHE_DURATION
    ) {
      setOptions(cachedData[foodType].data);
      return;
    } else {
      const fetchOptions = async () => {
        try {
          const records = await pb.collection("food").getFullList({
            filter: `type = "${foodType}"`,
          });
          setOptions(records);

          const newData = {
            data: records,
            timestamp: Date.now(),
          };
          const newCachedData = { ...cachedData, [foodType]: newData };
          localStorage.setItem("foodOptions", JSON.stringify(newCachedData));
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchOptions();
    }
  }, [foodType]);

  return <NewMenuOptions options={options} value={value} onChange={onChange} />;
};

export default NewMenuDropdown;
