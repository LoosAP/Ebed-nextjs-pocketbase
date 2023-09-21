import styles from "@/app/style";
import Denied from "@/components/Denied";
import { OrderSummary } from "@/components/vendor";

import { checkPrivileges } from "@/utils/useUser";
import React from "react";

const page = async () => {
  const privilege = await checkPrivileges();

  return (
    <main className={styles.page}>
      {privilege === "vendor" ? <OrderSummary /> : <Denied />}
    </main>
  );
};

export default page;
