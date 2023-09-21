import styles from "@/app/style";
import Denied from "@/components/Denied";
import ManageOrders from "@/components/vendor/ManageOrders";
import { getPrice } from "@/utils/getPrice";
import { checkLoginEnabled, checkPrivileges } from "@/utils/useUser";
import React from "react";
const page = async () => {
  const privilege = await checkPrivileges();
  const loginEnabled = await checkLoginEnabled();
  const prices = await getPrice();

  return (
    <main className={` ${styles.page}`}>
      {privilege === "vendor" && loginEnabled ? (
        <>
          <ManageOrders prices={prices} />
        </>
      ) : (
        <Denied />
      )}
    </main>
  );
};

export default page;
