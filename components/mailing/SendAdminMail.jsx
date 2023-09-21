"use client";
import { pb } from "@/utils/pocketbase";
import { useState } from "react";
import { Alert } from "../UI";

const SendAdminMail = (userDataList) => {
  const [recipientType, setRecipientType] = useState("");
  const [specificUser, setSpecificUser] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [file, setFile] = useState([]);
  const [status, setStatus] = useState("");
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (
      selectedFile &&
      allowedTypes.includes(selectedFile.type) &&
      selectedFile.size <= maxSize
    ) {
      setFile([...file, selectedFile]);
      setStatus("");
    } else {
      setFile([]);
      setStatus(
        "Invalid fájl típus. Kérlek válassz egy JPEG, PNG vagy PDF-et, ami kisebb, mint 5 MB."
      );
    }
    console.log(file);
  };

  const handleRecipientTypeChange = (event) => {
    setRecipientType(event.target.value);
  };

  const handleSpecificUserChange = (event) => {
    setSpecificUser(event.target.value);
  };

  const handleEmailSubjectChange = (event) => {
    setEmailSubject(event.target.value);
  };

  const handleEmailMessageChange = (event) => {
    setEmailMessage(event.target.value);
  };

  const handlePlaceholderClick = (placeholder, event) => {
    navigator.clipboard.writeText(placeholder);
    const popupElement = document.createElement("div");
    popupElement.textContent = "vágólapra másolva";
    popupElement.style.position = "absolute";
    popupElement.style.backgroundColor = "#B9AA81";
    popupElement.style.color = "#FFFFFF";
    popupElement.style.padding = "0.5rem";
    popupElement.style.borderRadius = "0.25rem";
    popupElement.style.top = `${
      event.target.offsetTop - popupElement.offsetHeight - 5
    }px`;
    popupElement.style.left = `${
      event.target.offsetLeft +
      event.target.offsetWidth / 2 -
      popupElement.offsetWidth / 2
    }px`;
    popupElement.style.opacity = "0";
    popupElement.style.transition = "opacity 0.2s ease-in-out";
    event.target.parentNode.appendChild(popupElement);
    setTimeout(() => {
      popupElement.style.opacity = "1";
    }, 0);
    setTimeout(() => {
      popupElement.style.opacity = "0";
    }, 1800);
    setTimeout(() => {
      popupElement.parentNode.removeChild(popupElement);
    }, 2000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let users;
    if (recipientType !== "specific") {
      users = await pb.collection("users").getFullList({
        filter: `privilege = '${recipientType}'`,
      });
    }
    if (recipientType === "specific") {
      users = await pb.collection("users").getFullList({
        filter: `email = '${specificUser}'`,
      });
    }

    const usernamePlaceholder = "{felhasználónév}";
    const balancePlaceholder = "{egyenleg}";
    const firstnamePlaceholder = "{vezetéknév}";
    const lastnamePlaceholder = "{keresztnév}";
    const emailPlaceholder = "{email}";
    const idPlaceholder = "{id}";
    const privilegePlaceholder = "{jogosultság}";

    users.map(async (user) => {
      let subject = emailSubject;
      subject = subject.replace(usernamePlaceholder, user.username);
      subject = subject.replace(balancePlaceholder, user.balance);
      subject = subject.replace(firstnamePlaceholder, user.firstname);
      subject = subject.replace(lastnamePlaceholder, user.lastname);
      subject = subject.replace(emailPlaceholder, user.email);
      subject = subject.replace(idPlaceholder, user.id);
      subject = subject.replace(privilegePlaceholder, user.privilege);

      let message = emailMessage;

      message = message.replace(usernamePlaceholder, user.username);
      message = message.replace(balancePlaceholder, user.balance);
      message = message.replace(firstnamePlaceholder, user.firstname);
      message = message.replace(lastnamePlaceholder, user.lastname);
      message = message.replace(emailPlaceholder, user.email);
      message = message.replace(idPlaceholder, user.id);
      message = message.replace(privilegePlaceholder, user.privilege);
      console.log(subject);
      console.log(message);
      try {
        const body = {
          email: user.email,
          subject: subject,
          message: message,
          attachment: file,
        };
        const res = await fetch("/api/sendadminmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        }
        setStatus("Levelek elküldve!");
      } catch (error) {
        console.log(error);
        setStatus("Hiba történt!");
      }
    });

    // Send email logic here
  };

  return (
    <div className="flex flex-col justify-center  w-[80%]  sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          Levél küldése
        </h1>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="recipient-type"
                className="block font-medium text-gray-700"
              >
                Címzett típusa{" "}
              </label>
              <div className="mt-1">
                <select
                  id="recipient-type"
                  name="recipient-type"
                  value={recipientType}
                  onChange={handleRecipientTypeChange}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:primary focus:border-primary sm:text-sm"
                >
                  <option value="">Válasszon címzettet</option>
                  <option value="user">Minden felhasználó</option>
                  <option value="vendor">Minden szolgáltató</option>
                  <option value="admin">Minden admin</option>
                  <option value="specific">Specifikus</option>
                </select>
              </div>
            </div>
            {recipientType === "specific" && (
              <div>
                <label
                  htmlFor="specific-user"
                  className="block font-medium text-gray-700"
                >
                  Címzett
                </label>
                <div className="mt-1">
                  <input
                    list="userDataList"
                    type="text"
                    name="specific-user"
                    id="specific-user"
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:primary focus:border-primary sm:text-sm"
                    value={specificUser}
                    onChange={handleSpecificUserChange}
                  />
                </div>
              </div>
            )}
            <div>
              <label
                htmlFor="email-subject"
                className="block font-medium text-gray-700"
              >
                Tárgy
              </label>
              <div className="mt-1">
                <textarea
                  id="email-subject"
                  name="email-subject"
                  rows="1"
                  value={emailSubject}
                  onChange={handleEmailSubjectChange}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:primary focus:border-primary sm:text-sm"
                ></textarea>
              </div>
            </div>
            <div>
              <label
                htmlFor="email-message"
                className="block font-medium text-gray-700"
              >
                Üzenet
              </label>
              <div className="mt-1">
                <textarea
                  id="email-message"
                  name="email-message"
                  rows="5"
                  value={emailMessage}
                  onChange={handleEmailMessageChange}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:primary focus:border-primary sm:text-sm"
                ></textarea>
              </div>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Alkalmazható helyettesítők:{" "}
              <span
                className="cursor-pointer"
                onClick={(event) =>
                  handlePlaceholderClick("{felhasználónév}", event)
                }
              >{`{felhasználónév}`}</span>
              ,{" "}
              <span
                className="cursor-pointer"
                onClick={(event) => handlePlaceholderClick("{egyenleg}", event)}
              >{`{egyenleg}`}</span>
              ,
              <span
                className="cursor-pointer"
                onClick={(event) =>
                  handlePlaceholderClick("{vezetéknév}", event)
                }
              >{`{vezetéknév}`}</span>
              ,{" "}
              <span
                className="cursor-pointer"
                onClick={(event) =>
                  handlePlaceholderClick("{keresztnév}", event)
                }
              >{`{keresztnév}`}</span>
              ,{" "}
              <span
                className="cursor-pointer"
                onClick={(event) => handlePlaceholderClick("{email}", event)}
              >{`{email}`}</span>
              ,{" "}
              <span
                className="cursor-pointer"
                onClick={(event) => handlePlaceholderClick("{id}", event)}
              >{`{id}`}</span>
              ,{" "}
              <span
                className="cursor-pointer"
                onClick={(event) =>
                  handlePlaceholderClick("{jogosultság}", event)
                }
              >{`{jogosultság}`}</span>
            </div>
            <div className="mb-4">
              <label
                htmlFor="file"
                className="block mb-2 font-bold text-gray-700"
              >
                Fájl:
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:primary disabled:opacity-50 disabled:hover:bg-primary"
                disabled={recipientType === ""}
              >
                Küldés
              </button>
            </div>
          </form>
        </div>
      </div>
      {status && <Alert message={status} setMessage={setStatus} />}
    </div>
  );
};

export default SendAdminMail;
