import { pb } from "@/utils/pocketbase";
import { id } from "date-fns/locale";
import { useState } from "react";

const SettingsDialog = (props) => {
  const { isOpen, onClose, item, privilege, onRefresh, message, setMessage } =
    props;
  const [balance, setBalance] = useState(item.balance);
  const [worker_id, setWorker_id] = useState(item.worker_id);
  const [can_login, setCan_login] = useState(item.can_login);
  const [itemPrivilege, setItemPrivilege] = useState(item.privilege);
  const handleClose = () => {
    setBalance(item.balance);
    setWorker_id(item.worker_id);
    setCan_login(item.can_login);
    setItemPrivilege(item.privilege);

    onClose();
  };

  const handleSubmit = () => {
    console.log(item);
    const data = new FormData();
    data.append("balance", balance);
    if (privilege === "admin") {
      data.append("worker_id", worker_id);
      data.append("can_login", can_login);
      data.append("privilege", itemPrivilege);
    }
    console.log(data);
    try {
      const updateUser = pb.collection("users").update(item.id, data);
      setMessage("Sikeres módosítás");
      handleClose();
    } catch (error) {
      setMessage(error.message);
    }
    onRefresh();
  };

  const handleDelete = () => {
    if (balance !== 0) {
      setMessage("Nem törölhet felhasználót amíg nem rendezte a számláját!");
      return;
    }
    try {
      const deleteRecord = pb.collection("users").delete(item.id);
      setMessage("Sikeres törlés");
    } catch (error) {
      setMessage(error.message);
    }
    handleClose();
    onRefresh();
  };
  const handleConfirmDialog = () => {
    if (window.confirm("Biztosan módosítod a felhasználót?")) {
      handleSubmit();
    }
  };
  const handleDeleteDialog = () => {
    if (window.confirm("Biztosan törölni szeretnéd a felhasználót?")) {
      handleDelete();
    }
  };
  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "block" : "hidden"
      } bg-gray-500 bg-opacity-50`}
    >
      <div className="fixed p-6 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg top-1/2 left-1/2">
        <h2 className="text-2xl font-bold text-center">
          {privilege === "vendor"
            ? "Számla szerkesztése"
            : "Felhasználó szerkesztése"}
        </h2>
        <button
          type="button"
          className="absolute top-0 right-0 px-4 py-1 text-xl font-bold text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full hover:bg-red-800"
          onClick={handleClose}
        >
          ×
        </button>

        <div className="flex flex-col justify-center">
          <div className="mb-4">
            <label htmlFor="balance" className="block mb-2 font-medium">
              Számla
            </label>
            <input
              type="number"
              id="balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md"
            />
          </div>
          <div className={`mt-4 ${privilege === "admin" ? "block" : "hidden"}`}>
            <label htmlFor="worker_id" className="block mb-2 font-medium">
              Dolgozószám
            </label>
            <input
              type="text"
              id="worker_id"
              value={worker_id}
              onChange={(e) => setWorker_id(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md"
            />
          </div>
          <div className={`mt-4 ${privilege === "admin" ? "block" : "hidden"}`}>
            <label htmlFor="can_login" className="block mb-2 font-medium">
              Beléphet?
            </label>
            <input
              type="checkbox"
              id="can_login"
              checked={can_login}
              onChange={(e) => setCan_login(e.target.checked)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md"
            />
          </div>
          <div className={`mt-4 ${privilege === "admin" ? "block" : "hidden"}`}>
            <label htmlFor="privilege" className="block mb-2 font-medium">
              Szerepkör
            </label>
            <select
              id="privilege"
              value={itemPrivilege}
              onChange={(e) => setItemPrivilege(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md"
            >
              <option value="admin">Admin</option>
              <option value="vendor">Szolgáltató</option>
              <option value="user">Felhasználó</option>
            </select>

            <div
              className={`my-4 ${privilege === "admin" ? "block" : "hidden"}`}
            >
              <button
                type="button"
                className="w-full px-4 py-2 text-white bg-red-500 border border-red-500 rounded-md hover:border-red-600 hover:bg-red-800"
                onClick={handleDeleteDialog}
              >
                Felhasználó Törlése
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 mr-2 bg-gray-100 border border-gray-400 rounded-md hover:bg-gray-200"
              onClick={handleClose}
            >
              Mégse
            </button>
            <button
              type="button"
              className="px-4 py-2 text-white border rounded-md border-primary bg-primary hover:bg-yellow-800"
              onClick={handleConfirmDialog}
            >
              Mentés
            </button>
          </div>
        </div>
      </div>
    </div>

    // <dialog open={isOpen} className="dialog">
    //   <form className="form">
    //     <h2>Set User Data</h2>
    //     <label htmlFor="balance">Balance</label>
    //     <input
    //       type="number"
    //       name="balance"
    //       value={balance}
    //       onChange={(e) => setBalance(e.target.value)}
    //     />
    //     <label htmlFor="worker_id">Worker ID</label>
    //     <input
    //       type="number"
    //       name="worker_id"
    //       value={worker_id}
    //       onChange={(e) => setWorker_id(e.target.value)}
    //     />
    //     <label htmlFor="can_login">Can Login</label>
    //     <input
    //       type="checkbox"
    //       name="can_login"
    //       value={can_login}
    //       onChange={(e) => setCan_login(e.target.value)}
    //     />
    //     <label htmlFor="privilege">Privilege</label>
    //     <input
    //       type="text"
    //       name="privilege"
    //       value={itemPrivilege}
    //       onChange={(e) => setItemPrivilege(e.target.value)}
    //     />
    //     <button type="button" className="button" onClick={onClose}>
    //       Cancel
    //     </button>
    //     <button type="button" className="button" onClick={handleConfirmDialog}>
    //       Confirm
    //     </button>
    //   </form>
    // </dialog>
  );
};

const SetUserData = (props) => {
  const {
    className,
    children,
    item,
    privilege,
    message,
    setMessage,
    onRefresh,
    ...rest
  } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <>
      <button
        title="Felhasználó szerkesztése"
        onClick={handleOpenDialog}
        className={`${className}`}
      >
        {children}
      </button>

      <SettingsDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        item={item}
        privilege={privilege}
        message={message}
        setMessage={setMessage}
        onRefresh={onRefresh}
      />
    </>
  );
};

export default SetUserData;
