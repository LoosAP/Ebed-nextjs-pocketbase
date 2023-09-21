"use client";

import Input from "@/components/UI/Inputs/Input";
import { NewMenuDropdown } from "@/components/menu";
import { pb } from "@/utils/pocketbase";
import React, { useEffect, useState } from "react";
import { Alert, SubmitButton } from "../UI";
import Loading from "../UI/Loading";

const Newmenu = () => {
  const getNextMonday = () => {
    const today = new Date();
    const daysUntilMonday = ((8 - today.getDay()) % 7) + 1;
    const nextMonday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + daysUntilMonday
    );
    return nextMonday.toISOString().slice(0, 10);
  };

  const calculateNextDate = (date, daysToAdd) => {
    const day = new Date(date);
    day.setDate(day.getDate() + daysToAdd);
    return day.toISOString().slice(0, 10);
  };

  const [hetfoDate, setHetfoDate] = useState(getNextMonday());
  const [keddDate, setKeddDate] = useState(calculateNextDate(hetfoDate, 1));
  const [szerdaDate, setSzerdaDate] = useState(calculateNextDate(hetfoDate, 2));
  const [csutortokDate, setCsutortokDate] = useState(
    calculateNextDate(hetfoDate, 3)
  );
  const [pentekDate, setPentekDate] = useState(calculateNextDate(hetfoDate, 4));
  const [hetfoLeves, setHetfoLeves] = useState();
  const [hetfoA, setHetfoA] = useState();
  const [hetfoB, setHetfoB] = useState();
  const [keddLeves, setKeddLeves] = useState();
  const [keddA, setKeddA] = useState();
  const [keddB, setKeddB] = useState();
  const [szerdaLeves, setSzerdaLeves] = useState();
  const [szerdaA, setSzerdaA] = useState();
  const [szerdaB, setSzerdaB] = useState();
  const [csutortokLeves, setCsutortokLeves] = useState();
  const [csutortokA, setCsutortokA] = useState();
  const [csutortokB, setCsutortokB] = useState();
  const [pentekLeves, setPentekLeves] = useState();
  const [pentekA, setPentekA] = useState();
  const [pentekB, setPentekB] = useState();
  const [E, setE] = useState();
  const [L1, setL1] = useState();
  const [L2, setL2] = useState();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      switch (name) {
        case "hetfoDate":
          setHetfoDate(date.toISOString().slice(0, 10));
          setKeddDate(calculateNextDate(date, 1));
          setSzerdaDate(calculateNextDate(date, 2));
          setCsutortokDate(calculateNextDate(date, 3));
          setPentekDate(calculateNextDate(date, 4));
          break;
        case "keddDate":
          setKeddDate(date.toISOString().slice(0, 10));
          break;
        case "szerdaDate":
          setSzerdaDate(date.toISOString().slice(0, 10));
          break;
        case "csutortokDate":
          setCsutortokDate(date.toISOString().slice(0, 10));
          break;
        case "pentekDate":
          setPentekDate(date.toISOString().slice(0, 10));
          break;
        default:
          break;
      }
    }
  };

  const checkIfRecordExists = async (date) => {
    try {
      const db = await pb.collection("menu").getFullList();

      let exists = false;

      for (let index = 0; index < db.length; index++) {
        const recordDate = new Date(db[index].date).toISOString().slice(0, 10);
        if (recordDate === date) {
          exists = true;
          break;
        }
      }
      return exists;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const check = await checkIfRecordExists(hetfoDate);

      if (check) {
        setStatus("Már létezik menü a megadott dátumra!");
        setLoading(false);
        return;
      }

      const hetfoData = {
        date: hetfoDate,
        soup: hetfoLeves,
        choice_A: hetfoA,
        choice_B: hetfoB,
        choice_E: E,
        choice_L1: L1,
        choice_L2: L2,
        price_A: "frr1his6oia58zd",
        price_B: "frr1his6oia58zd",
        price_E: "frr1his6oia58zd",
        price_L1: "frr1his6oia58zd",
        price_L2: "frr1his6oia58zd",
      };
      const keddData = {
        date: keddDate,
        soup: keddLeves,
        choice_A: keddA,
        choice_B: keddB,
        choice_E: E,
        choice_L1: L1,
        choice_L2: L2,
        price_A: "frr1his6oia58zd",
        price_B: "frr1his6oia58zd",
        price_E: "frr1his6oia58zd",
        price_L1: "frr1his6oia58zd",
        price_L2: "frr1his6oia58zd",
      };
      const szerdaData = {
        date: szerdaDate,
        soup: szerdaLeves,
        choice_A: szerdaA,
        choice_B: szerdaB,
        choice_E: E,
        choice_L1: L1,
        choice_L2: L2,
        price_A: "frr1his6oia58zd",
        price_B: "frr1his6oia58zd",
        price_E: "frr1his6oia58zd",
        price_L1: "frr1his6oia58zd",
        price_L2: "frr1his6oia58zd",
      };
      const csutortokData = {
        date: csutortokDate,
        soup: csutortokLeves,
        choice_A: csutortokA,
        choice_B: csutortokB,
        choice_E: E,
        choice_L1: L1,
        choice_L2: L2,
        price_A: "frr1his6oia58zd",
        price_B: "frr1his6oia58zd",
        price_E: "frr1his6oia58zd",
        price_L1: "frr1his6oia58zd",
        price_L2: "frr1his6oia58zd",
      };
      const pentekData = {
        date: pentekDate,
        soup: pentekLeves,
        choice_A: pentekA,
        choice_B: pentekB,
        choice_E: E,
        choice_L1: L1,
        choice_L2: L2,
        price_A: "frr1his6oia58zd",
        price_B: "frr1his6oia58zd",
        price_E: "frr1his6oia58zd",
        price_L1: "frr1his6oia58zd",
        price_L2: "frr1his6oia58zd",
      };

      const hetfoRecord = await pb.collection("menu").create(hetfoData);
      const keddRecord = await pb.collection("menu").create(keddData);
      const szerdaRecord = await pb.collection("menu").create(szerdaData);
      const csutortokRecord = await pb.collection("menu").create(csutortokData);
      const pentekRecord = await pb.collection("menu").create(pentekData);
      setLoading(false);
      setStatus("Sikeres feltöltés!");
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setStatus("Sikertelen feltöltés, próbálja újra!");
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="flex flex-row justify-center">
            <div className="w-[15%]">
              <Input
                type="date"
                name="hetfoDate"
                defaultValue={hetfoDate}
                onChange={handleDateChange}
                min={getNextMonday()}
                required
              ></Input>
              <NewMenuDropdown
                foodType="Soup"
                value="Leves"
                name="hetfoLeves"
                onChange={(e) => {
                  setHetfoLeves(e.target.value);
                }}
              ></NewMenuDropdown>
              <NewMenuDropdown
                foodType="Normal"
                value="A menü"
                name="hetfoA"
                onChange={(e) => {
                  setHetfoA(e.target.value);
                }}
              ></NewMenuDropdown>
              <NewMenuDropdown
                foodType="Normal"
                value="B menü"
                name="hetfoB"
                onChange={(e) => setHetfoB(e.target.value)}
              ></NewMenuDropdown>
            </div>

            <div className="w-[15%]">
              <Input
                disabled
                type="date"
                name="keddDate"
                onChange={handleDateChange}
                defaultValue={keddDate}
              ></Input>
              <NewMenuDropdown
                foodType="Soup"
                value="Leves"
                name="keddLeves"
                onChange={(e) => setKeddLeves(e.target.value)}
              ></NewMenuDropdown>
              <NewMenuDropdown
                foodType="Normal"
                value="A menü"
                name="keddA"
                onChange={(e) => setKeddA(e.target.value)}
              ></NewMenuDropdown>
              <NewMenuDropdown
                foodType="Normal"
                value="B menü"
                name="keddB"
                onChange={(e) => setKeddB(e.target.value)}
              ></NewMenuDropdown>
            </div>

            <div className="w-[15%]">
              <Input
                disabled
                type="date"
                defaultValue={szerdaDate}
                name="szerdaDate"
                onChange={handleDateChange}
              ></Input>
              <NewMenuDropdown
                foodType="Soup"
                value="Leves"
                name="szerdaLeves"
                onChange={(e) => setSzerdaLeves(e.target.value)}
              ></NewMenuDropdown>
              <NewMenuDropdown
                foodType="Normal"
                value="A menü"
                name="szerdaA"
                onChange={(e) => setSzerdaA(e.target.value)}
              ></NewMenuDropdown>
              <NewMenuDropdown
                foodType="Normal"
                value="B menü"
                name="szerdaB"
                onChange={(e) => setSzerdaB(e.target.value)}
              ></NewMenuDropdown>
            </div>

            <div className="w-[15%]">
              <Input
                disabled
                type="date"
                name="csutortokDate"
                onChange={handleDateChange}
                defaultValue={csutortokDate}
              ></Input>
              <NewMenuDropdown
                foodType="Soup"
                value="Leves"
                name="csutortokLeves"
                onChange={(e) => setCsutortokLeves(e.target.value)}
              ></NewMenuDropdown>
              <NewMenuDropdown
                foodType="Normal"
                value="A menü"
                name="csutortokA"
                onChange={(e) => setCsutortokA(e.target.value)}
              ></NewMenuDropdown>
              <NewMenuDropdown
                foodType="Normal"
                value="B menü"
                name="csutortokB"
                onChange={(e) => setCsutortokB(e.target.value)}
              ></NewMenuDropdown>
            </div>

            <div className="w-[15%]">
              <Input
                disabled
                type="date"
                name="pentekDate"
                onChange={handleDateChange}
                defaultValue={pentekDate}
              ></Input>
              <NewMenuDropdown
                foodType="Soup"
                value="Leves"
                name="pentekLeves"
                onChange={(e) => setPentekLeves(e.target.value)}
              ></NewMenuDropdown>
              <NewMenuDropdown
                foodType="Normal"
                value="A menü"
                name="pentekA"
                onChange={(e) => setPentekA(e.target.value)}
              ></NewMenuDropdown>
              <NewMenuDropdown
                foodType="Normal"
                value="B menü"
                name="pentekB"
                onChange={(e) => setPentekB(e.target.value)}
              ></NewMenuDropdown>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <div className="w-[75%]">
              <NewMenuDropdown
                foodType="E"
                value="E menü"
                name="E menü"
                onChange={(e) => setE(e.target.value)}
              ></NewMenuDropdown>
            </div>

            <div className="w-[75%]">
              <NewMenuDropdown
                foodType="Fix"
                value="Fix 1"
                name="Fix 1"
                onChange={(e) => setL1(e.target.value)}
              ></NewMenuDropdown>
            </div>

            <div className="w-[75%]">
              <NewMenuDropdown
                foodType="Fix"
                value="Fix 2"
                name="Fix 2"
                onChange={(e) => setL2(e.target.value)}
              ></NewMenuDropdown>
            </div>
          </div>
        </div>
        <SubmitButton type="submit">
          {loading ? <Loading /> : <>Menü feltöltése</>}
        </SubmitButton>
      </form>

      {status && <Alert message={status} setMessage={setStatus} />}
    </div>
  );
};

export default Newmenu;
