"use client";

import { accountmangagement } from "@/app/style";
import { logo, slideshowphoto1, slideshowphoto2 } from "@/public/img";

import { pb } from "@/utils/pocketbase";
import { Alert, SubmitButton } from "components/UI";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Slideshow from "../UI/Slideshow";
const SignUpForm = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [worker_id, setWorker_id] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        username: userName,
        email: email,
        emailVisibility: true,
        password: password,
        passwordConfirm: passwordConfirm,
        firstname: firstName,
        lastname: lastName,
        privilege: "user",
        can_login: false,
        balance: 0,
        worker_id: worker_id,
      };

      const result = await pb.collection("users").create(data);

      setLoginStatus("Sikeres regisztráció!");
      router.refresh();
      router.replace("/account/login");
    } catch (error) {
      console.error("Error:", error);
      setLoginStatus("Ellenőrizze hogy a beírt mezők helyesek-e!");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-row shadow-md sm:border sm:border-black sm:shadow-2xl">
      <div className="flex flex-col items-center justify-center m-2 sm:m-10">
        <div className="flex flex-row items-center space-x-6 ">
          <Image src={logo} alt="logo" className="mb-6 shadow-xl " />
          <h1 className="text-xl font-bold">Regisztráció</h1>
        </div>
        <form
          onSubmit={handleRegister}
          className="flex flex-col items-center justify-between space-y-4 "
        >
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2">
            <input
              label="Felhasználónév"
              required
              type="text"
              placeholder="Felhasználónév"
              className={accountmangagement.input}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              label="Dolgozószám"
              // REGEX, minimum 5 szám vagy betű, vagy üres
              pattern="^([a-zA-Z0-9]{5})?$"
              type="text"
              placeholder="Dolgozószám (Ha van)"
              className={accountmangagement.input}
              onChange={(e) => setWorker_id(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2">
            <input
              label="Vezetéknév"
              required
              type="text"
              placeholder="Vezetéknév"
              className={accountmangagement.input}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              label="Keresztnév"
              required
              type="text"
              placeholder="Keresztnév"
              className={accountmangagement.input}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input
            label="Email"
            required
            type="email"
            placeholder="Email"
            className={`${accountmangagement.input} sm:w-full`}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2">
            <input
              label="Jelszó"
              required
              type="password"
              placeholder="Jelszó"
              className={`${accountmangagement.input} peer/password `}
              onChange={(e) => setPassword(e.target.value)}
              pattern="^[A-Za-z\d@$!%*#?&]{8,}$"
            />
            <input
              label="Jelszó megerősítése"
              required
              type="password"
              placeholder="Jelszó megerősítése"
              className={`border peer/passwordconfirm invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 border-gray-400 rounded-[5px] focus:outline-none p-0.5 shadow-inner outline-transparent drop-shadow-md ${
                passwordConfirm === password
                  ? ""
                  : "border-pink-500 text-pink-600 focus:border-pink-500"
              }`}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <p
            className={`${
              password.length >= 8 ? "hidden" : "flex"
            } text-pink-600 text-[14px]`}
          >
            A jelszónak legalább <br className="block sm:hidden" />8 karakterből
            kell állnia
          </p>
          <p
            className={`${
              password.length < 8 ||
              (password.length >= 8 && password === passwordConfirm)
                ? "hidden"
                : "flex"
            } text-pink-600 text-[14px]`}
          >
            A jelszavaknak egyezniük kell
          </p>
          <div>
            <input
              type="checkbox"
              className="border border-gray-400 rounded-[5px] focus:outline-none p-0.5 m-0.5 shadow-inner outline-transparent drop-shadow-md"
              required
              about="privacy"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="privacy" className="text-[14px] text-gray-400 ">
              Elfogadom az adatvédelmi nyilatkozatot
            </label>
          </div>
          <div className="flex flex-row items-stretch space-x-10 justify-stretch">
            <button
              type="button"
              className="bg-transparent text-primary rounded-[5px] py-2 px-2 focus:outline-none p-0.5"
              onClick={() => router.replace("/account/login")}
            >
              Már van fiókom
            </button>
            <button
              type="submit"
              className="bg-primary text-white rounded-[5px] py-2 px-2 focus:outline-none p-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !isChecked}
            >
              Regisztráció
            </button>
          </div>
          {loginStatus && (
            <Alert
              className="mt-2"
              message={loginStatus}
              setMessage={setLoginStatus}
            />
          )}
        </form>
      </div>

      <Slideshow interval={5000} />
    </div>
  );
};

export default SignUpForm;
