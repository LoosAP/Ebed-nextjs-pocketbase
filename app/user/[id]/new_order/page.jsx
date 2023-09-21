import styles from "@/app/style";
import Denied from "@/components/Denied";
import WeeklyMenu from "@/components/menu/WeeklyMenu";
import Neworder from "@/components/user/Neworder";
import { getPrice } from "@/utils/getPrice";
import { pb } from "@/utils/pocketbase";
import {
  checkLoginEnabled,
  checkPrivileges,
  useUserProtected,
} from "@/utils/useUser";
import { getISOWeeksInYear, getWeek, nextMonday } from "date-fns";
import React from "react";

const page = async (props) => {
  const privilege = await checkPrivileges();
  const loginEnabled = await checkLoginEnabled();
  const params = props.params;
  const user = useUserProtected();
  const weeks = [];
  const currentYear = new Date().getFullYear();

  const menuItems = await pb.collection("menu2").getFullList({
    filter: `week = '${getWeek(
      nextMonday(new Date())
    )}' && year = ${new Date().getFullYear()}`,
    $autoCancel: false,
  });

  for (let i = 1; i <= getISOWeeksInYear(currentYear); i++) {
    weeks.push(i);
  }

  const prices = await getPrice();
  return (
    <main className={`${styles.page} print:pt-0  `}>
      {privilege === "user" && loginEnabled ? (
        <div className="flex flex-col items-center justify-center md:flex-row ">
          <WeeklyMenu
            className={`py-[50px] text-secondary font-bold `}
            prices={prices}
            weeks={weeks}
            initialMenuItems={menuItems}
          />
          <Neworder
            id={params.id}
            className={`md:py-0 py-[50px] text-secondary font-bold `}
            prices={prices}
            user={user}
          />
        </div>
      ) : (
        <Denied />
      )}
    </main>
  );
};

export default page;
