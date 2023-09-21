import styles from "@/app/style";
import Denied from "@/components/Denied";
import OrderChanges from "@/components/orders/OrderChanges";

import UserManager from "@/components/UserManager";
import { checkLoginEnabled, checkPrivileges } from "@/utils/useUser";

const page = async () => {
  const privilege = await checkPrivileges();
  const loginEnabled = await checkLoginEnabled();

  return (
    <main className={`${styles.page}`}>
      {privilege === "admin" && loginEnabled ? (
        <UserManager privilege={privilege} />
      ) : (
        <Denied />
      )}
    </main>
  );
};

export default page;
