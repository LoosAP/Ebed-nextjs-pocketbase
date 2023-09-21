import styles from "@/app/style";
import Denied from "@/components/Denied";
import SetPrices from "@/components/vendor/SetPrices";
import { api_Url } from "@/utils/consts";
import { checkPrivileges } from "@/utils/useUser";
import React from "react";

const page = async () => {
  const privilege = await checkPrivileges();
  const id = "frr1his6oia58zd";
  const priceData = await fetch(
    `${api_Url}collections/price/records/${id}`
  ).then((res) => res.json());
  return (
    <main className={styles.page}>
      {privilege === "vendor" ? (
        <SetPrices priceData={priceData} />
      ) : (
        <Denied />
      )}
    </main>
  );
};

export default page;
