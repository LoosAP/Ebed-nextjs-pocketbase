import styles from "@/app/style";
import Denied from "@/components/Denied";
import SendAdminMail from "@/components/mailing/SendAdminMail";
import { pb } from "@/utils/pocketbase";
import { checkLoginEnabled, checkPrivileges } from "@/utils/useUser";

const page = async () => {
  const privilege = await checkPrivileges();
  const loginEnabled = await checkLoginEnabled();
  const users = await pb.collection("users").getFullList({
    $autoCancel: false,
  });

  return (
    <main className={styles.page}>
      {privilege === "admin" && loginEnabled ? <SendAdminMail /> : <Denied />}
      <datalist id="userDataList">
        {users.map((user) => (
          <option key={user.id} value={user.email}>
            {user.id} - {user.email}
          </option>
        ))}
      </datalist>
    </main>
  );
};

export default page;
