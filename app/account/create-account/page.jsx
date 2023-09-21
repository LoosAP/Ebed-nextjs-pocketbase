import styles from "@/app/style";
import SignUpForm from "@/components/auth/SignUpForm";
import { checkLoggedIn } from "@/utils/useUser";

import React from "react";

const Create_account = () => {
  checkLoggedIn();
  return (
    <main className={styles.page}>
      <SignUpForm />
    </main>
  );
};

export default Create_account;
