import { format } from "date-fns";
const RenderMenuInputs = ({
  menuData,
  handleInputChange,
  soupOptions,
  normalOptions,
  eOptions,
  fixOptions,
}) => {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  soupOptions = soupOptions.map((option) => option.name);
  normalOptions = normalOptions.map((option) => option.name);
  eOptions = eOptions.map((option) => option.name);
  fixOptions = fixOptions.map((option) => option.name);

  //converts days to hungarian
  const formatDay = (day) => {
    switch (day) {
      case "monday":
        return "Hétfő";
      case "tuesday":
        return "Kedd";
      case "wednesday":
        return "Szerda";
      case "thursday":
        return "Csütörtök";
      case "friday":
        return "Péntek";
      default:
        return day;
    }
  };

  return (
    <>
      <div className="flex flex-col items-stretch justify-between ">
        <h3 className="mb-2 text-lg font-medium"> &nbsp;</h3>
        <label className="flex items-center space-x-2">
          <span className="p-2 mx-1 my-2 font-medium ">Leves:</span>
        </label>
        <label className="flex items-center space-x-2">
          <span className="p-2 mx-1 my-2 font-medium ">A:</span>
        </label>
        <label className="flex items-center space-x-2">
          <span className="p-2 mx-1 my-2 font-medium ">B:</span>
        </label>
        <label className="flex items-center space-x-2">
          <span className="p-2 mx-1 my-2 font-medium ">E:</span>
        </label>
        <label className="flex items-center space-x-2">
          <span className="p-2 mx-1 my-2 font-medium ">Fix 1:</span>
        </label>
        <label className="flex items-center space-x-2">
          <span className="p-2 mx-1 my-2 font-medium ">Fix 2:</span>
        </label>
      </div>
      {days.map((day) => (
        <div key={day} className="flex flex-col items-stretch justify-between">
          <div>
            <h3 className="flex justify-center mb-2 text-lg font-medium">
              {formatDay(day)}
            </h3>
          </div>

          <input
            type="text"
            value={menuData[day]?.soup || ""}
            onChange={(event) => handleInputChange(event, day, "soup")}
            className={`border flex items-center space-x-2 p-2 rounded-md my-2 mx-1  border-gray-400 shadow-inner outline-transparent drop-shadow-md focus:outline-none focus:ring-2 ease-in-out duration-150 focus:ring-primary ${
              soupOptions.includes(menuData[day]?.soup) ||
              menuData[day]?.soup === ""
                ? ""
                : "border border-red-500"
            }`}
            list="soupOptions"
          />

          <input
            type="text"
            value={menuData[day]?.A || ""}
            onChange={(event) => handleInputChange(event, day, "A")}
            className={`border flex items-center space-x-2 p-2 rounded-md my-2 mx-1  border-gray-400 shadow-inner outline-transparent drop-shadow-md focus:outline-none focus:ring-2 ease-in-out duration-150 focus:ring-primary ${
              normalOptions.includes(menuData[day]?.A) ||
              menuData[day]?.A === ""
                ? ""
                : " border border-red-500"
            }`}
            list="normalOptions"
          />

          <input
            type="text"
            value={menuData[day]?.B || ""}
            onChange={(event) => handleInputChange(event, day, "B")}
            className={`border flex items-center space-x-2 p-2 rounded-md my-2 mx-1  border-gray-400 shadow-inner outline-transparent drop-shadow-md focus:outline-none focus:ring-2 ease-in-out duration-150 focus:ring-primary ${
              normalOptions.includes(menuData[day]?.B) ||
              menuData[day]?.B === ""
                ? ""
                : " border border-red-500"
            }`}
            list="normalOptions"
          />

          <input
            type="text"
            value={menuData[day]?.E || ""}
            onChange={(event) => handleInputChange(event, day, "E")}
            className={`border flex items-center space-x-2 p-2 rounded-md my-2 mx-1  border-gray-400 shadow-inner outline-transparent drop-shadow-md focus:outline-none focus:ring-2 ease-in-out duration-150 focus:ring-primary ${
              eOptions.includes(menuData[day]?.E) || menuData[day]?.E === ""
                ? ""
                : " border border-red-500"
            }`}
            list="eOptions"
          />

          <input
            type="text"
            value={menuData[day]?.L1 || ""}
            onChange={(event) => handleInputChange(event, day, "L1")}
            className={`border flex items-center space-x-2 p-2 rounded-md my-2 mx-1  border-gray-400 shadow-inner outline-transparent drop-shadow-md focus:outline-none focus:ring-2 ease-in-out duration-150 focus:ring-primary ${
              fixOptions.includes(menuData[day]?.L1) || menuData[day]?.L1 === ""
                ? ""
                : " border border-red-500"
            }`}
            list="fixOptions"
          />

          <input
            type="text"
            value={menuData[day]?.L2 || ""}
            onChange={(event) => handleInputChange(event, day, "L2")}
            className={`border flex items-center space-x-2 p-2 rounded-md my-2 mx-1  border-gray-400 shadow-inner outline-transparent drop-shadow-md focus:outline-none focus:ring-2 ease-in-out duration-150 focus:ring-primary  ${
              fixOptions.includes(menuData[day]?.L2) || menuData[day]?.L2 === ""
                ? ""
                : " border border-red-500"
            }`}
            list="fixOptions"
          />
        </div>
      ))}
    </>
  );
};

export default RenderMenuInputs;
