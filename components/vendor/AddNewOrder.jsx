import { pb } from "@/utils/pocketbase";
import { set } from "date-fns";
import { useState } from "react";

const AddOrderDialog = (props) => {
  const { isOpen, onClose, prices, onEdit, message, setMessage, ...rest } =
    props;

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [choices, setChoices] = useState("A");
  const [gy_soup, setGy_soup] = useState(false);
  const [takeout, setTakeout] = useState(false);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
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

  const handleClose = () => {
    setFirstname("");
    setLastname("");
    setDate(new Date().toISOString().split("T")[0]);
    setChoices("A");
    setGy_soup(false);
    setTakeout(false);
    setPrice(0);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("firstname", firstname);
    data.append("lastname", lastname);
    data.append("date", date);
    data.append("choices", choices);
    data.append("gy_soup", gy_soup);
    data.append("takeout", takeout);
    data.append("price", calculateNewPrice(choices, takeout));
    data.append("paid", false);

    try {
      const result = await pb.collection("orders").create(data);
      setMessage("Sikeres mentés");
    } catch (error) {
      setMessage("Sikertelen mentés");
    }
    setLoading(false);
    onEdit();
    handleClose();
  };

  const handleChoicesChange = (event) => {
    const newChoices = event.target.value;
    setChoices(newChoices);

    if (newChoices === "L1" || newChoices === "L2") {
      setGy_soup(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "block" : "hidden"
      } bg-gray-500 bg-opacity-50`}
    >
      <div className="fixed flex-col items-center p-6 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg top-1/2 left-1/2">
        <h2 className="mb-4 text-lg font-medium">Új rendelés hozzáadása</h2>
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
              className="w-full px-3 py-2 border border-gray-400 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastname" className="block mb-2 font-medium">
              Vezetéknév
            </label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(event) => {
                const newLastname = event.target.value;
                setLastname(newLastname);
              }}
              className="w-full px-3 py-2 border border-gray-400 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="firstname" className="block mb-2 font-medium">
              Keresznév
            </label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(event) => {
                const newFirstname = event.target.value;
                setFirstname(newFirstname);
              }}
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
              <option value="L1">Fix 1</option>
              <option value="L2">Fix 2</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="gy_soup" className="block mb-2 font-medium ">
              Gyümölcsleves
            </label>
            <input
              type="checkbox"
              id="gy_soup"
              checked={gy_soup}
              onChange={(event) => {
                const newGy_soup = event.target.checked;
                setGy_soup(newGy_soup);
              }}
              className="mr-2"
              disabled={choices === "L1" || choices === "L2"}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="takeout" className="block mb-2 font-medium ">
              Elvitel
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
const AddNewOrder = (props) => {
  const {
    className,
    children,
    title,
    prices,
    onEdit,
    message,
    setMessage,

    ...rest
  } = props;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <button
        title={title}
        onClick={handleDialogOpen}
        className={`${className}`}
        {...rest}
      >
        {children}
      </button>
      <AddOrderDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        prices={prices}
        onEdit={onEdit}
        message={message}
        setMessage={setMessage}
      />
    </>
  );
};

export default AddNewOrder;
