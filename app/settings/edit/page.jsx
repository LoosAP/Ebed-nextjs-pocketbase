import styles from "@/app/style";
import { BackButton } from "@/components/UI";
import EditProfileForm from "@/components/auth/EditProfileForm";
import { getUserData, useUserProtected } from "@/utils/useUser";
import React from "react";

const page = async () => {
  const user = useUserProtected();
  const userData = await getUserData();
  return (
    <main className={styles.page}>
      <EditProfileForm user={userData} />
    </main>
  );
};

export default page;
