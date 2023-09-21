import styles from "@/app/style";
import Denied from "@/components/Denied";
import { Newmenu2 } from "@/components/vendor";
import Newmenu from "@/components/vendor/Newmenu";
import { getPrice } from "@/utils/getPrice";
import { pb } from "@/utils/pocketbase";
import {
  checkLoggedIn,
  checkLoginEnabled,
  checkPrivileges,
} from "@/utils/useUser";
import { getISOWeeksInYear } from "date-fns";

import React from "react";

const page = async () => {
  const privilege = await checkPrivileges();
  const loginEnabled = await checkLoginEnabled();
  const weeks = [];
  const currentYear = new Date().getFullYear();
  const prices = getPrice();
  const GetExistingWeeks = async () =>
    await pb.collection("menu2").getList(1, 1000, {
      filter: `year = ${currentYear}`,
      $autoCancel: false,
    });

  const existingWeeks = await GetExistingWeeks();

  const checkWeekexists = async () => {
    if (existingWeeks.items.length === 0) {
      for (let i = 1; i <= getISOWeeksInYear(currentYear); i++) {
        const newWeeks = {
          year: currentYear,
          week: i,
        };
        await pb.collection("menu2").create(newWeeks);
      }
    }
  };
  checkWeekexists();

  for (let i = 1; i <= getISOWeeksInYear(currentYear); i++) {
    weeks.push(i);
  }

  return (
    <main className={styles.page}>
      {privilege === "vendor" && loginEnabled ? (
        <Newmenu2 prices={prices} weeks={weeks} />
      ) : (
        <Denied />
      )}
    </main>
  );
};

export default page;
