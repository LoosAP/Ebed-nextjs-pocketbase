import Navbar from "@/components/Navbar";
import React from "react";
import "./globals.css";
import "./page.jsx";
import styles from "./style.js";

const RootLayout = async ({ children }) => {
  return (
    <html lang="en">
      <body className=" font-opensans">
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;

export const metadata = {
  title: "Ebédrendelés",
  description: "Ebédrendelés teszt",
};
