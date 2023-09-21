"use client";
import { pb } from "@/utils/pocketbase";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSWRConfig } from "swr";

const LogoutPage = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const handleLogout = async () => {
    pb.authStore.clear();
    logout();
    mutate(() => true, undefined, false);
    await router.push("/");
    router.refresh();
  };
  useEffect(() => {
    const logout = async () => {
      await handleLogout();
    };
    logout();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-sm text-zinc-600">
      <Loading />
      Logging out...
    </div>
  );
};

export default LogoutPage;
