"use client";
import { pb } from "@/utils/pocketbase";
import { Sub } from "@radix-ui/react-dropdown-menu";
import { addDays, format, getWeek, nextMonday, startOfWeek } from "date-fns";
import { stringify } from "postcss";
import React, { useEffect, useState } from "react";
import { Alert, SubmitButton } from "../UI";
import RenderMenuInputs from "../UI/Inputs/RenderMenuInputs";

const Newmenu = ({ weeks, prices }) => {
  const [isValid, setIsValid] = useState(true);
  const [status, setStatus] = useState("");
  const [soupOptions, setSoupOptions] = useState([]);
  const [normalOptions, setNormalOptions] = useState([]);
  const [eOptions, setEOptions] = useState([]);
  const [fixOptions, setFixOptions] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(
    getWeek(nextMonday(new Date()))
  );
  const [menuItems, setMenuItems] = useState([]);
  const [menuData, setMenuData] = useState({
    monday: { soup: "", A: "", B: "", E: "", L1: "", L2: "" },
    tuesday: { soup: "", A: "", B: "", E: "", L1: "", L2: "" },
    wednesday: { soup: "", A: "", B: "", E: "", L1: "", L2: "" },
    thursday: { soup: "", A: "", B: "", E: "", L1: "", L2: "" },
    friday: { soup: "", A: "", B: "", E: "", L1: "", L2: "" },
  });
  useEffect(() => {
    const fetchOptions = async () => {
      const soupOptions = await pb.collection("food").getFullList({
        filter: "type = 'Soup'",
        sort: "name",
        $autoCancel: false,
      });
      const normalOptions = await pb.collection("food").getFullList({
        filter: "type = 'Normal'",
        sort: "name",
        $autoCancel: false,
      });
      const eOptions = await pb.collection("food").getFullList({
        filter: "type = 'E'",
        sort: "name",
        $autoCancel: false,
      });
      const fixOptions = await pb.collection("food").getFullList({
        filter: "type = 'Fix'",
        sort: "name",
        $autoCancel: false,
      });
      setSoupOptions(soupOptions);
      setNormalOptions(normalOptions);
      setEOptions(eOptions);
      setFixOptions(fixOptions);
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const menuItems = await pb.collection("menu2").getFullList({
        filter: `week = '${selectedWeek}'`,
        $autoCancel: false,
      });
      setMenuItems(menuItems);
    };
    fetchMenuItems();
    handleWeekChange({ target: { value: selectedWeek } });
  }, [selectedWeek]);

  const handleWeekChange = async (event) => {
    const week = event.target.value;
    setSelectedWeek(week);
    let menuItem = await pb.collection("menu2").getList(1, 1, {
      filter: `week = '${week}' && year = ${new Date().getFullYear()}`,
      $autoCancel: false,
    });

    menuItem = menuItem.items[0];

    if (menuItem && menuItem.menu) {
      setMenuData(menuItem.menu);
    } else {
      setMenuData({
        monday: { soup: "", A: "", B: "", E: "", L1: "", L2: "" },
        tuesday: { soup: "", A: "", B: "", E: "", L1: "", L2: "" },
        wednesday: { soup: "", A: "", B: "", E: "", L1: "", L2: "" },
        thursday: { soup: "", A: "", B: "", E: "", L1: "", L2: "" },
        friday: { soup: "", A: "", B: "", E: "", L1: "", L2: "" },
      });
    }
  };

  const handleInputChange = (event, day, field) => {
    const value = event.target.value;
    setMenuData((prevMenuData) => ({
      ...prevMenuData,
      [day]: {
        ...prevMenuData[day],
        [field]: value,
      },
    }));
  };

  const handleEmail = async (event) => {
    event.preventDefault();
    //sends email to every user with the privilege attribute of "user" about the new weekly menu
    const users = await pb.collection("users").getFullList({
      filter: "privilege = 'user'",
      $autoCancel: false,
    });

    // for each user, send an email about the menu being updated, using the /api/send endpoint
    users.forEach(async (user) => {
      const data = {
        email: user.email,
        prices: JSON.parse(prices.value),
        date: selectedWeek,
        menuData: menuData,
      };

      try {
        const res = await fetch("/api/sendmenunotifs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        }
        setStatus("Értesítők kiküldve!");
      } catch (error) {
        console.error(error);
        setStatus("Hiba történt az értesítők kiküldése közben!");
        // handle the error here
      }
    });
  };

  const getOptions = (type) => {
    switch (type) {
      case "soup":
        return soupOptions.map((item) => item.name);
      case "A":
      case "B":
        return normalOptions.map((item) => item.name);
      case "E":
        return eOptions.map((item) => item.name);
      case "L1":
      case "L2":
        return fixOptions.map((item) => item.name);
      default:
        return [];
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("menuData:", menuData);
    const menuItem = await pb.collection("menu2").getList(1, 1, {
      filter: `week = '${selectedWeek}' && year = '${new Date().getFullYear()}'`,
    });

    let isValid = true;
    Object.entries(menuData).forEach(([day, dayData]) => {
      Object.entries(dayData).forEach(([meal, mealData]) => {
        const options = getOptions(meal);
        if (mealData !== "" && !options.includes(mealData)) {
          isValid = false;
        }
      });
    });
    if (isValid) {
      await pb
        .collection("menu2")
        .update(menuItem.items[0].id, { menu: menuData });
      setStatus("Menü sikeresen frissítve");
    } else {
      setStatus(
        "Ellenőrizze a hibás mezőket és próbálja újra. Lehet az ételek nem lettek felvéve?"
      );
    }
  };

  return (
    <>
      <h2>
        <span className="ml-2 text-xl text-secondary">Heti menü</span>
      </h2>
      <label className="flex flex-col items-center ">
        <p>Hét:</p>
        <select
          className="flex items-center p-2 mx-1 my-2 space-x-2 duration-150 ease-in-out border border-gray-400 rounded-md shadow-inner outline-transparent drop-shadow-md focus:outline-none focus:ring-2 focus:ring-primary "
          value={selectedWeek}
          onChange={handleWeekChange}
        >
          {weeks.map((week) => {
            const year = new Date().getFullYear();
            const monday = startOfWeek(new Date(year, 0, week * 7 - 6), {
              weekStartsOn: 1,
            });
            const friday = addDays(monday, 4);
            return (
              <option key={week} value={week}>
                {`${week}.hét,  ${format(
                  monday,
                  "yyyy.MM.dd"
                )} Hétfő - ${format(friday, "yyyy.MM.dd")} Péntek`}
              </option>
            );
          })}
        </select>
      </label>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row justify-between">
          <RenderMenuInputs
            menuData={menuData}
            handleInputChange={handleInputChange}
            soupOptions={soupOptions}
            normalOptions={normalOptions}
            eOptions={eOptions}
            fixOptions={fixOptions}
            isValid={isValid}
            setIsValid={setIsValid}
          />
        </div>
        <div className="flex flex-row items-center justify-center ">
          <SubmitButton className={` mr-2 `}>
            <span className="text-xl">Mentés</span>
          </SubmitButton>
          <button
            type="button"
            onClick={handleEmail}
            className="bg-secondary rounded-[20px] p-5 text-white text-[22px] font-bold mt-2 hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
          >
            <span className="text-xl">Értesítések kiküldése</span>
          </button>
        </div>
      </form>

      <datalist id="soupOptions">
        {soupOptions.map((item) => (
          <option key={item.id} value={item.name} />
        ))}
      </datalist>
      <datalist id="normalOptions">
        {normalOptions.map((item) => (
          <option key={item.id} value={item.name} />
        ))}
      </datalist>
      <datalist id="eOptions">
        {eOptions.map((item) => (
          <option key={item.id} value={item.name} />
        ))}
      </datalist>
      <datalist id="fixOptions">
        {fixOptions.map((item) => (
          <option key={item.id} value={item.name} />
        ))}
      </datalist>
      {status && <Alert message={status} setMessage={setStatus} />}
    </>
  );
};

export default Newmenu;
