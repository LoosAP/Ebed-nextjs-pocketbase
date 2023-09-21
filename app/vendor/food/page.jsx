import styles from "@/app/style";
import Denied from "@/components/Denied";
import ManageFoods from "@/components/vendor/ManageFoods";
import { checkLoginEnabled, checkPrivileges } from "@/utils/useUser";
import React from "react";

const page = async () => {
  const privilege = await checkPrivileges();
  const loginEnabled = await checkLoginEnabled();

  return (
    <main className={` ${styles.page}`}>
      {privilege === "vendor" && loginEnabled ? (
        <>
          <ManageFoods />
        </>
      ) : (
        <Denied />
      )}
    </main>
  );
};

export default page;
