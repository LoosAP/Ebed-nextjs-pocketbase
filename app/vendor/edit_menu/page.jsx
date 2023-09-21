import styles from "@/app/style";
import Denied from "@/components/Denied";
import { ManageMenu } from "@/components/vendor";
import { checkLoggedIn, checkPrivileges } from "@/utils/useUser";
import React from "react";

const page = async () => {
  const privilege = await checkPrivileges();

  return (
    <main className={styles.page}>
      {privilege === "vendor" ? <ManageMenu /> : <Denied />}
    </main>
  );
};

export default page;
