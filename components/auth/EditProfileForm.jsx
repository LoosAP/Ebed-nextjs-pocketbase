"use client";

import { accountmangagement } from "@/app/style";
import { logo } from "@/public/img";
import { pb } from "@/utils/pocketbase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Alert, Input, SubmitButton } from "../UI";
import Loading from "../UI/Loading";
import Slideshow from "../UI/Slideshow";

const EditProfileForm = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [userName, setUserName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstname);
  const [lastName, setLastName] = useState(user.lastname);

  const [userNameUpdated, setUserNameUpdated] = useState(false);
  const [emailUpdated, setEmailUpdated] = useState(false);
  const [firstNameUpdated, setFirstNameUpdated] = useState(false);
  const [lastNameUpdated, setLastNameUpdated] = useState(false);

  const router = useRouter();
  const id = user?.id;

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    if (userNameUpdated) {
      data.append("username", userName);
    }
    if (emailUpdated) {
      data.append("email", email);
    }
    if (firstNameUpdated) {
      data.append("firstname", firstName);
    }
    if (lastNameUpdated) {
      data.append("lastname", lastName);
    }
    try {
      const result = await pb.collection("users").update(id, data);
      console.log(result);
      setStatus("Sikeresen mentve!");
    } catch (error) {
      console.error("Error:", error);
      setStatus(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-row shadow-md sm:border sm:border-black sm:shadow-2xl">
      {user && id ? (
        <div className="flex flex-col items-center justify-center m-2 sm:m-10">
          <div className="flex flex-row items-center space-x-6 ">
            <Image src={logo} alt="logo" className="mb-6 shadow-xl " />
            <h1 className="text-xl font-bold">Fiók szerkesztése</h1>
          </div>
          <form
            onSubmit={submitForm}
            className="flex flex-col items-center justify-between space-y-4 "
          >
            <div className="flex flex-col sm:space-x-2 sm:flex-row">
              <div className="flex flex-col">
                <label htmlFor="username" className="text-[12px] text-gray-400">
                  Felhasználónév
                </label>
                <input
                  id="username"
                  value={userName}
                  className={accountmangagement.input}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    if (userName !== user.username) {
                      setUserNameUpdated(true);
                    } else {
                      setUserNameUpdated(false);
                    }
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="worker-id"
                  className="text-[12px] text-gray-400"
                >
                  Dolgozószám
                </label>
                <input
                  id="worker_id"
                  value={user.worker_id}
                  disabled
                  className={accountmangagement.input}
                />
              </div>
            </div>
            <div className="flex flex-col sm:space-x-2 sm:flex-row">
              <div className="flex flex-col">
                <label
                  htmlFor="firstname"
                  className="text-[12px] text-gray-400"
                >
                  Vezetéknév
                </label>
                <input
                  id="firstname"
                  value={firstName}
                  className={accountmangagement.input}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (firstName !== user.firstname) {
                      setFirstNameUpdated(true);
                    } else {
                      setFirstNameUpdated(false);
                    }
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="worker-id"
                  className="text-[12px] text-gray-400"
                >
                  Keresznév
                </label>
                <input
                  id="lastname"
                  value={lastName}
                  className={accountmangagement.input}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (lastName !== user.lastname) {
                      setLastNameUpdated(true);
                    } else {
                      setLastNameUpdated(false);
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col sm:w-full">
              <label htmlFor="email" className="text-[12px] text-gray-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                defaultValue={email}
                className={` ${accountmangagement.input}`}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (email !== user.email) {
                    setEmailUpdated(true);
                  } else {
                    setEmailUpdated(false);
                  }
                }}
              />
            </div>
            <div className="flex flex-row items-stretch space-x-10 justify-stretch">
              <button
                type="button"
                className="bg-transparent text-primary rounded-[5px] py-2 px-2 focus:outline-none p-0.5"
                onClick={() => router.back()}
              >
                Vissza
              </button>
              <button
                type="submit"
                className="bg-primary text-white rounded-[5px] py-2 px-2 focus:outline-none p-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Mentés
              </button>
            </div>
            {status && <Alert message={status} setMessage={setStatus} />}
          </form>
        </div>
      ) : (
        <Loading />
      )}
      <Slideshow interval={5000} />
    </div>
  );
};

export default EditProfileForm;
