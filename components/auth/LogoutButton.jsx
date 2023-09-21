"use client";

import { logout } from "@/utils/auth";
import { pb } from "@/utils/pocketbase";
import { ExitIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

const LogoutButton = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  async function handleLogout() {
    pb.authStore.clear();
    logout();
    mutate(() => true, undefined, false);
    await router.push("/");
    router.refresh();
  }
  return (
    <button onClick={handleLogout}>
      <ExitIcon />
    </button>
  );
};

export default LogoutButton;
