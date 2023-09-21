import styles from "@/app/style";
import OrderChanges from "@/components/orders/OrderChanges";

import { checkLoginEnabled, checkPrivileges } from "@/utils/useUser";

const page = async () => {
  const privilege = await checkPrivileges();
  const loginEnabled = await checkLoginEnabled();

  return (
    <main className={` ${styles.page}`}>
      {privilege === "vendor" && loginEnabled ? (
        <>
          <OrderChanges />
        </>
      ) : (
        <Denied />
      )}
    </main>
  );
};

export default page;
