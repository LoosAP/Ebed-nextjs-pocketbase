import styles from "@/app/style";
import LoginForm from "@/components/auth/LoginForm";
import { checkLoggedIn, checkPrivileges } from "@/utils/useUser";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Login = () => {
  checkLoggedIn();
  return (
    <main className={styles.page}>
      <LoginForm />
    </main>
  );
};

export default Login;
