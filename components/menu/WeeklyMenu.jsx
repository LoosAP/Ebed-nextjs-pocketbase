"use client";

import styles from "@/app/style";
import { pb } from "@/utils/pocketbase";
import { DownloadIcon } from "@radix-ui/react-icons";
import {
  addDays,
  format,
  getWeek,
  nextFriday,
  nextMonday,
  startOfWeek,
} from "date-fns";
import React, { useEffect, useState } from "react";
import Loading from "../UI/Loading";

const WeeklyMenu = ({ prices, weeks, initialMenuItems }) => {
  const year = new Date().getFullYear();
  const nextWeek = getWeek(nextMonday(new Date()));
  const [date, setDate] = useState(nextWeek);
  const [menuData, setMenuData] = useState(initialMenuItems);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(true);
  //   fetchMenuItems();
  //   setLoading(false);
  //   handleWeekChange({ target: { value: date } });
  // }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const menuItems = await pb.collection("menu2").getFullList({
        filter: `week = '${date}' && year = ${year}`,
      });
      setMenuData(menuItems);
    };
    setLoading(true);
    fetchMenuItems();
    setLoading(false);
    handleWeekChange({ target: { value: date } });
  }, [date]);

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  const handlePrint = () => {
    window.print();
  };

  const handleWeekChange = async (event) => {
    const week = event.target.value;
    setDate(week);
    let menuItem = await pb.collection("menu2").getList(1, 1, {
      filter: `week = '${week}' && year = ${new Date().getFullYear()}`,
      $autoCancel: false,
    });

    menuItem = menuItem.items[0];

    if (menuItem && menuItem.menu) {
      setMenuData(menuItem.menu);
    } else {
      setMenuData({});
    }
  };

  if (loading) return <Loading />;

  return (
    <div
      className={`flex ml-0 md:ml-20 print:ml-0 flex-col md:mb-10 print:mb-0 justify-center`}
    >
      <h1
        className={`py-[20px] ${styles.heading2} text-secondary self-center print:hidden`}
      >
        Heti menü
      </h1>
      <h1
        className={`py-[20px] ${styles.heading2} text-secondary self-center print:block hidden`}
      >
        Alföld Kincse
      </h1>
      <div className="flex flex-col items-center justify-center">
        <select
          className="flex items-center p-2 mx-1 my-2 space-x-2 duration-150 ease-in-out border border-gray-400 rounded-md shadow-inner print:hidden outline-transparent drop-shadow-md focus:outline-none focus:ring-2 focus:ring-primary "
          value={date}
          onChange={handleWeekChange}
        >
          {weeks.map((week, index) => {
            const year = new Date().getFullYear();
            const monday = startOfWeek(new Date(year, 0, week * 7 - 6), {
              weekStartsOn: 1,
            });
            const friday = addDays(monday, 4);
            return (
              <option key={`${week}-${index}`} value={week}>
                {`${week}.hét,  ${format(
                  monday,
                  "yyyy.MM.dd"
                )} Hétfő - ${format(friday, "yyyy.MM.dd")} Péntek`}
              </option>
            );
          })}
        </select>
      </div>
      {!(
        menuData[days[0]]?.soup ||
        menuData[days[1]]?.soup ||
        menuData[days[2]]?.soup ||
        menuData[days[3]]?.soup ||
        menuData[days[4]]?.soup
      ) ? (
        <div className="flex flex-row justify-center">
          <p>
            A héten nincs (még) heti menü <br /> Előfordulhat, hogy újra be kell
            tölteni oldalt a menühöz
          </p>
        </div>
      ) : (
        <>
          <table className="self-center">
            <thead>
              <tr>
                <th></th>
                <th>
                  Hétfő <br />
                  {format(
                    startOfWeek(
                      new Date(new Date().getFullYear(), 0, date * 7 - 6),
                      {
                        weekStartsOn: 1,
                      }
                    ),
                    "yyyy-MM-dd"
                  )}
                </th>
                <th>
                  Kedd
                  <br />
                  {format(
                    startOfWeek(
                      new Date(new Date().getFullYear(), 0, date * 7 - 6),
                      {
                        weekStartsOn: 2,
                      }
                    ),
                    "yyyy-MM-dd"
                  )}
                </th>
                <th>
                  Szerda
                  <br />
                  {format(
                    startOfWeek(
                      new Date(new Date().getFullYear(), 0, date * 7 - 6),
                      {
                        weekStartsOn: 3,
                      }
                    ),
                    "yyyy-MM-dd"
                  )}
                </th>
                <th>
                  Csütörtök
                  <br />
                  {format(
                    startOfWeek(
                      new Date(new Date().getFullYear(), 0, date * 7 - 6),
                      {
                        weekStartsOn: 4,
                      }
                    ),
                    "yyyy-MM-dd"
                  )}
                </th>
                <th>
                  Péntek
                  <br />
                  {format(
                    startOfWeek(
                      new Date(new Date().getFullYear(), 0, date * 7 - 6),
                      {
                        weekStartsOn: 5,
                      }
                    ),
                    "yyyy-MM-dd"
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold">Leves</td>
                {days.map((day, index) => (
                  <td key={`${day}-${menuData[day]?.soup}-${index}`}>
                    {menuData[day]?.soup || "ezen a napon nincs leves"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="font-bold">
                  Főétel "A" <br />{" "}
                  <p className="underline text-secondary">{prices.price_A}Ft</p>
                </td>
                {days.map((day, index) => (
                  <td key={`${day}-${menuData[day]?.A}-${index}`}>
                    {menuData[day]?.A || "ezen a napon nincs A menü"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="font-bold">
                  Főétel "B" <br />{" "}
                  <p className="underline text-secondary">{prices.price_B}Ft</p>
                </td>
                {days.map((day, index) => (
                  <td key={`${day}-${menuData[day]?.B}-${index}`}>
                    {menuData[day]?.B || "ezen a napon nincs B menü"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="font-bold">
                  Főétel "E" <br />{" "}
                  <p className="underline text-secondary">{prices.price_E}Ft</p>
                </td>
                {days.map((day, index) => (
                  <td key={`${day}-${menuData[day]?.E}-${index}`}>
                    {menuData[day]?.E || "ezen a napon nincs E menü"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <p className="italic underline pt-1.5 text-[23px] mt-10">
            Leves nélkül:
          </p>
          <ul className="list-disc">
            <div className="flex flex-row justify-between">
              <li className="ml-6 text-[16px] italic ">
                {menuData[days[0]]?.L1 ||
                  menuData[days[1]]?.L1 ||
                  menuData[days[2]]?.L1 ||
                  menuData[days[3]]?.L1 ||
                  menuData[days[4]]?.L1 ||
                  "Ezen a héten nincs fix 1 menü"}
              </li>
              <p className="font-bold underline text-secondary">
                {prices.price_L1}Ft
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <li className="ml-6 text-[16px] italic">
                {menuData[days[0]]?.L2 ||
                  menuData[days[1]]?.L2 ||
                  menuData[days[2]]?.L2 ||
                  menuData[days[3]]?.L2 ||
                  menuData[days[4]]?.L2 ||
                  "Ezen a héten nincs fix 2 menü"}
              </li>
              <p className="font-bold underline text-secondary">
                {prices.price_L2}Ft
              </p>
            </div>
          </ul>
        </>
      )}

      <p className="my-2 font-bold text-[16px] text-secondary">
        A napi menü leves helyett rendelhető GYÜMÖLCSLEVES, melyet az előző
        munkanap kérjük jelezni.
      </p>
      <p className="text-[20px] my-2">Látogasson meg minket!</p>
      <p className="italic font-bold underline ">
        Napi ételrendelés leadását, módosítását, lemondását előző munkanap
        kérjük leadni!
      </p>

      <div className="flex flex-row items-center justify-between my-5 border-b-4 border-b-secondary">
        <p className="font-bold uppercase text-secondary">
          Elviteles doboz ára:
        </p>
        <p className="font-bold text-secondary">{prices.price_takeout}Ft/db</p>
      </div>
      <p className="italic">Jó étvágyat kívánunk!</p>
      <p className="italic">(70) 379 5300</p>
      <p className="italic">szivugyunk.vargaeva@gmail.com</p>

      <p className="flex justify-center mt-10 text-md">
        Az étlap változtatás jogát fenntartjuk
      </p>
      <div className="flex justify-center">
        <button
          onClick={handlePrint}
          className="flex flex-row items-center justify-center w-40 h-10 text-lg font-bold text-white rounded-md shadow-md print:hidden bg-secondary hover:bg-red-950 "
        >
          <p>Nyomtatás</p>
          <DownloadIcon className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default WeeklyMenu;
