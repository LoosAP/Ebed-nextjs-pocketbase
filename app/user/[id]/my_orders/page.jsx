import styles from "@/app/style";
import Denied from "@/components/Denied";
import MyOrders from "@/components/user/MyOrders";
import { getPrice } from "@/utils/getPrice";
import {
  checkLoginEnabled,
  checkPrivileges,
  getUserData,
} from "@/utils/useUser";
import React from "react";
const page = async ({ params }) => {
  const privilege = await checkPrivileges();
  const loginEnabled = await checkLoginEnabled();
  const user = await getUserData();
  const balance = user.balance;
  const prices = await getPrice();
  return (
    <main className={` ${styles.page}`}>
      {privilege === "user" && loginEnabled ? (
        <>
          <MyOrders id={params.id} prices={prices} balance={balance} />
        </>
      ) : (
        <Denied />
      )}
    </main>
  );
};

export default page;
