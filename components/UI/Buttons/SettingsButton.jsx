import { pb } from "@/utils/pocketbase";
import { GearIcon } from "@radix-ui/react-icons";
import { addDays, nextFriday, nextMonday, nextTuesday } from "date-fns";
import React, { useState } from "react";

const SettingsDialog = ({
  isOpen,
  onClose,
  item,
  prices,
  onEdit,
  isInThePast,
  message,
  setMessage,
}) => {
  const now = new Date();
  const isMonday = now.getDay() === 1;
  const isBefore9am = now.getHours() < 9;
  const isEndOfWeek =
    now.getDay() === 5 || now.getDay() === 6 || now.getDay() === 0;
  const isTodayValid = now.getHours() < 16;
  const [date, setDate] = useState(
    new Date(item.date).toISOString().split("T")[0]
  );
  const [choices, setChoices] = useState(`${item.choices}`);
  const [gy_soup, setGy_soup] = useState(item.gy_soup);
  const [takeout, setTakeout] = useState(item.takeout);
  const [loading, setLoading] = useState(false);

  const [gy_soup_disabled, setGy_soup_disabled] = useState(
    item.choices === "L1" || item.choices === "L2"
  );

  const handleClose = () => {
    setDate(new Date(item.date).toISOString().split("T")[0]);
    setChoices(item.choices);
    setGy_soup(item.gy_soup);
    setTakeout(item.takeout);

    onClose();
  };

  const handleChoicesChange = (event) => {
    const newChoices = event.target.value;
    setChoices(newChoices);
    setGy_soup_disabled(false);

    if (newChoices === "L1" || newChoices === "L2") {
      setGy_soup(false);
      setGy_soup_disabled(true);
    }
  };

  const calculateNewPrice = (choice, takeout) => {
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
        price = 0;
    }
    if (takeout) {
      price += prices.price_takeout;
    }
    return price;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData();

    data.append("date", date);
    data.append("choices", choices);
    data.append("gy_soup", gy_soup);
    data.append("takeout", takeout);
    data.append("price", calculateNewPrice(choices, takeout));

    try {
      const currentitemstate = await pb.collection("orders").getOne(item.id);
      if (currentitemstate.paid && !item.paid) {
        setMessage("Kifizetett rendelést nem változtathat meg!");
        onClose();
        setLoading(false);
        return;
      }

      if (item.paid) {
        data.append("request_type", "change");
        const result = await pb.collection("orders").update(item.id, {
          changed: true,
          change_request: JSON.stringify(Object.fromEntries(data)),
        });
        setMessage("Változtatási kérelem elküldve!");
      } else {
        const result = await pb.collection("orders").update(item.id, data);
        setMessage("Sikeresen mentve!");
      }
      onEdit();
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.message);
    }
    onClose();
    setLoading(false);
  };

  if (isInThePast) {
    return (
      <div
        className={`fixed inset-0 z-50 ${
          isOpen ? "block" : "hidden"
        } bg-gray-500 bg-opacity-50`}
      >
        <div className="fixed flex flex-col items-center p-6 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg top-1/2 left-1/2">
          <h2 className="mb-4 text-lg font-medium">Rendelés szerkesztése</h2>
          <button
            type="button"
            className="absolute top-0 right-0 px-4 py-1 text-xl font-bold text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full hover:bg-red-800"
            onClick={handleClose}
          >
            ×
          </button>
          <p className="mb-4 text-gray-600">
            Sajnos a rendelés nem szerkeszthető, mert a dátum már elmúlt.
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-white border rounded-md border-primary bg-primary hover:bg-yellow-800"
          >
            Rendben
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "block" : "hidden"
      } bg-gray-500 bg-opacity-50`}
    >
      <div className="fixed p-6 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg top-1/2 left-1/2">
        <h2 className="mb-4 text-lg font-medium">Rendelés szerkesztése</h2>
        <button
          type="button"
          className="absolute top-0 right-0 px-4 py-1 text-xl font-bold text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full hover:bg-red-800"
          onClick={handleClose}
        >
          ×
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block mb-2 font-medium">
              Dátum
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(event) => {
                const newDate = event.target.value;
                setDate(newDate);
              }}
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
              className="w-full px-3 py-2 border border-gray-400 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="choices" className="block mb-2 font-medium">
              Menü
            </label>
            <select
              id="choices"
              value={choices}
              onChange={handleChoicesChange}
              className="w-full px-3 py-2 border border-gray-400 rounded-md"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="E">E</option>
              <option value="L1">L1</option>
              <option value="L2">L2</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="gy_soup" className="block mb-2 font-medium">
              Gyümölcsleves
            </label>
            <input
              type="checkbox"
              id="gy_soup"
              checked={gy_soup}
              disabled={gy_soup_disabled}
              onChange={(event) => {
                const newGy_soup = event.target.checked;
                setGy_soup(newGy_soup);
              }}
              className="mr-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="takeout" className="block mb-2 font-medium">
              Elviteles doboz
            </label>
            <input
              type="checkbox"
              id="takeout"
              checked={takeout}
              onChange={(event) => {
                const newTakeout = event.target.checked;
                setTakeout(newTakeout);
              }}
              className="mr-2"
            />
          </div>

          {item.paid && (
            <p className="text-[14px] text-red-500 mb-2">
              Figyelem! fizetett rendelést csak engedéllyel lehet
              megváltoztatni!
            </p>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 mr-2 bg-gray-100 border border-gray-400 rounded-md hover:bg-gray-200"
            >
              Mégse
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white border rounded-md border-primary bg-primary hover:bg-yellow-800"
            >
              Mentés
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SettingsButton = ({
  className,
  item,
  prices,
  onEdit,
  isInThePast,
  message,
  setMessage,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <button
        title="Menü szerkesztése"
        onClick={handleOpenDialog}
        className={` ${className}`}
      >
        <GearIcon />
      </button>
      <SettingsDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        item={item}
        prices={prices}
        onEdit={onEdit}
        isInThePast={isInThePast}
        message={message}
        setMessage={setMessage}
      />
    </>
  );
};

export default SettingsButton;
