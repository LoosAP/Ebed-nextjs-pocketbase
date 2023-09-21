"use client";

import { pb } from "@/utils/pocketbase";

import { CrossCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { addDays, nextFriday, nextMonday, nextTuesday } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, SubmitButton } from "../UI";

const Neworder = ({ id, className, prices, user }) => {
  const firstname = user.model.firstname;
  const lastname = user.model.lastname;
  const worker_ID = user.model.worker_id;

  const now = new Date();
  const isMonday = now.getDay() === 1;
  const isBefore9am = now.getHours() < 9;
  const isEndOfWeek =
    now.getDay() === 5 || now.getDay() === 6 || now.getDay() === 0;
  const isTodayValid = now.getHours() < 16;
  const router = useRouter();
  const [elements, setElements] = useState([
    {
      // hét végén vagyunk ? akkor hétfő
      // : hétfő van kilenc előtt
      // ? akkor aznap még lehet
      // : 16 óra előtt vagyunk
      // ? akkor holnap
      // : holnapután
      date: isEndOfWeek
        ? nextMonday(new Date()).toISOString().substring(0, 10)
        : isMonday && isBefore9am
        ? now.toISOString().substring(0, 10)
        : isTodayValid
        ? addDays(new Date(), 1).toISOString().substring(0, 10)
        : addDays(new Date(), 2).toISOString().substring(0, 10),
      // date: isTodayValid
      //   ? isEndOfWeek
      //     ? nextTuesday(new Date()).toISOString().substring(0, 10)
      //     : addDays(new Date(), 1).toISOString().substring(0, 10)
      //   : isEndOfWeek
      //   ? nextMonday(new Date()).toISOString().substring(0, 10)
      //   : addDays(new Date(), 2).toISOString().substring(0, 10),

      choices: "A",
      gy_soup: false,
      takeout: false,
      ordered_by: id,
      firstname: firstname,
      lastname: lastname,
      worker_id: worker_ID,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleDateChange = (event, index) => {
    const newElements = [...elements];
    newElements[index] = {
      ...newElements[index],
      date: new Date(event.target.value).toISOString().substring(0, 10),
    };
    setElements(newElements);
  };

  const handleChoicesChange = (event, index) => {
    const newElements = [...elements];
    newElements[index] = {
      ...newElements[index],
      choices: event.target.value,
    };
    setElements(newElements);
  };

  const handleGySoupChange = (event, index) => {
    const newElements = [...elements];
    newElements[index] = {
      ...newElements[index],
      gy_soup: event.target.checked,
    };
    setElements(newElements);
  };

  const handleTakeoutChange = (event, index) => {
    const newElements = [...elements];
    newElements[index] = {
      ...newElements[index],
      takeout: event.target.checked,
    };
    setElements(newElements);
  };

  const addElement = () => {
    if (elements.length >= 10) {
      setStatus("Maximum 10 rendelést lehet egyszerre leadni!");
      return;
    }

    setElements([
      ...elements,
      {
        date: isEndOfWeek
          ? nextMonday(new Date()).toISOString().substring(0, 10)
          : isMonday && isBefore9am
          ? now.toISOString().substring(0, 10)
          : isTodayValid
          ? addDays(new Date(), 1).toISOString().substring(0, 10)
          : addDays(new Date(), 2).toISOString().substring(0, 10),
        choices: "A",
        gy_soup: false,
        takeout: false,
        ordered_by: id,
        firstname: firstname,
        lastname: lastname,
        worker_id: worker_ID,
      },
    ]);
  };

  const calculatePrice = (choice, takeout) => {
    let price = 0;
    switch (choice) {
      case "A":
        price = prices.price_A;
        break;
      case "B":
        price = prices.price_B;
        break;
      case "E":
        price = prices.price_E;
        break;
      case "L1":
        price = prices.price_L1;
        break;
      case "L2":
        price = prices.price_L2;
        break;
      default:
        break;
    }
    if (takeout) {
      price += prices.price_takeout;
    }

    return price;
  };

  const removeElement = (index) => {
    const newElements = elements.filter((_, i) => i !== index);
    setElements(newElements);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    for (let i = 0; i < elements.length; i++) {
      const elementData = {
        date: elements[i].date,
        choices: elements[i].choices,
        gy_soup:
          elements[i].choices === "L1" || elements[i].choices === "L2"
            ? false
            : elements[i].gy_soup,
        takeout: elements[i].takeout,
        ordered_by: elements[i].ordered_by,
        price: calculatePrice(elements[i].choices, elements[i].takeout),
        firstname: elements[i].firstname,
        lastname: elements[i].lastname,
        worker_id: elements[i].worker_id,
      };

      try {
        const result = await pb.collection("orders").create(elementData);
        setStatus("Rendelés sikeresen leadva!");

        setTimeout(() => {
          router.push(`/user/${id}/my_orders`);
        }, 2000);
      } catch (error) {
        console.error("Error:", error);
        setStatus(error.message);
      }
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col w-[500px] self-start md:mt-16 items-stretch gap-2 overflow-auto ${className} mx-auto md:mx-12 print:hidden`}
    >
      <div className="flex flex-row items-center justify-center ">
        <h1 className="text-2xl font-bold">Új rendelés</h1>
      </div>
      <div className="flex flex-row items-center justify-between gap-4">
        <p className="basis-1/3">Nap</p>
        <p className="basis-1/12">Menü</p>
        <p className="self-center basis-1/4">Gyümölcsleves</p>
        <p className="basis-1/4">Elvitel</p>
        <div className="basis-1/12"> &nbsp; </div>
      </div>
      {elements.map((element, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-between gap-4"
        >
          <input
            type="date"
            value={element.date}
            onChange={(e) => handleDateChange(e, index)}
            className="ml-0.5 duration-150 ease-in-out rounded shadow-inner  drop-shadow-md focus:ring-2 focus:ring-primary outline-transparent focus:outline-none basis-1/3"
            min={
              isEndOfWeek
                ? nextMonday(new Date()).toISOString().substring(0, 10)
                : isMonday && isBefore9am
                ? now.toISOString().substring(0, 10)
                : isTodayValid
                ? addDays(new Date(), 1).toISOString().substring(0, 10)
                : addDays(new Date(), 2).toISOString().substring(0, 10)
            }
            max={nextFriday(new Date()).toISOString().substring(0, 10)}
          />

          <select
            value={element.choices}
            onChange={(e) => handleChoicesChange(e, index)}
            className="block leading-tight duration-150 ease-in-out rounded shadow-inner drop-shadow-md focus:ring-2 focus:ring-primary outline-transparent focus:outline-none basis-1/12"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="E">E</option>
            <option value="L1">Fix 1</option>
            <option value="L2">Fix 2</option>
          </select>

          <input
            disabled={
              element.choices === "L1" || element.choices === "L2"
                ? true
                : false
            }
            type="checkbox"
            checked={
              element.choices === "L1" || element.choices === "L2"
                ? false
                : element.gy_soup
            }
            onChange={(e) => handleGySoupChange(e, index)}
            className="block ease-in-out rounded basis-1/4 accent-secondary focus:outline-none drop-shadow-md"
          />

          <input
            type="checkbox"
            checked={element.takeout}
            onChange={(e) => handleTakeoutChange(e, index)}
            className="block ease-in-out rounded basis-1/4 accent-secondary focus:outline-none drop-shadow-md"
          />
          <button
            type="button"
            onClick={() => removeElement(index)}
            className="basis-1/12"
          >
            <CrossCircledIcon />
          </button>
        </div>
      ))}
      <div className="flex flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={addElement}
          className="flex flex-row items-center justify-center gap-1 "
        >
          <p>Új</p>
          <PlusIcon />
        </button>

        <button type="submit" disabled={elements.length > 0 ? false : true}>
          Küldés
        </button>
      </div>
      {loading && <p>Rendelés leadása...</p>}
      {status && <Alert message={status} setMessage={setStatus} />}
    </form>
  );
};

export default Neworder;
