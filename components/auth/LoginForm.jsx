"use client";

import { logo } from "@/public/img";
import { login } from "@/utils/auth";
import { pb } from "@/utils/pocketbase";

import { accountmangagement } from "@/app/style";
import { Alert, Input, SubmitButton } from "components/UI";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Slideshow from "../UI/Slideshow";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await pb
        .collection("users")
        .authWithPassword(email, password);

      await login(email, password);
      setLoginStatus("Sikeresen belépve!");
      router.refresh();
      router.replace("/");
    } catch (error) {
      console.error("Error:", error);
      setLoginStatus(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-row-reverse shadow-md sm:border sm:border-black sm:shadow-2xl">
      <div className="flex flex-col items-center justify-center m-2 sm:m-10">
        <div className="flex flex-row items-center space-x-6 ">
          <Image src={logo} alt="logo" className="mb-6 shadow-xl " />
          <h1 className="text-xl font-bold">Bejelentkezés</h1>
        </div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-between mt-4 space-y-8 "
        >
          <input
            label="Email / Felhasználónév"
            required
            type="text"
            placeholder="Email / Felhasználónév"
            className={accountmangagement.input}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            label="Jelszó"
            required
            type="password"
            placeholder="Jelszó"
            className={accountmangagement.input}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex flex-row items-stretch space-x-10 justify-stretch">
            <button
              type="button"
              className="bg-transparent text-primary rounded-[5px] py-2 px-2 focus:outline-none p-0.5"
              onClick={() => router.replace("/account/create-account")}
            >
              Még nincs fiókom{" "}
            </button>
            <button
              type="submit"
              className="bg-primary text-white rounded-[5px] py-2 px-2 focus:outline-none p-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Bejelentkezés
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

export default LoginForm;

// <div>
//   <form
//     onSubmit={handleLogin}
//     className="flex flex-col items-center justify-between "
//   >
//     <Input
//       label="Email / Felhasználónév"
//       required
//       type="text"
//       placeholder="E-mail / Felhasználónév"
//       className="border border-secondary rounded-[5px] focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
//       onChange={(e) => setEmail(e.target.value)}
//     />
//     <Input
//       label="Jelszó"
//       required
//       type="password"
//       placeholder="Jelszó"
//       className="border border-secondary rounded-[5px] focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
//       //   pattern="^(?=.*[0-9]).{8,}$"
//       onChange={(e) => setPassword(e.target.value)}
//     />
//     <SubmitButton disabled={loading}>
//       {loading ? "Betöltés..." : "Belépés"}
//     </SubmitButton>
//   </form>
//   {loginStatus && (
//     <Alert message={loginStatus} setMessage={setLoginStatus} />
//   )}
// </div>
