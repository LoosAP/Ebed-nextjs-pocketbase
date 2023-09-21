import { getUserData } from "@/utils/useUser";
import React from "react";
import styles from "./style";

const Home = async () => {
  const user = await getUserData();
  return (
    <main className={styles.page}>
      <h1 className={`mx-auto ${styles.heading2}`}>
        Alföldi Nyomda <br className="block sm:hidden" /> Ebédrendelés
      </h1>
      {user.code === 404 ? (
        <p>
          Üdvözöljük az oldal teszt verziójában. <br />A folytatáshoz
          jelentkezzen be!
        </p>
      ) : user.can_login === false ? (
        <p>
          Önnek még nincsen elfogadva a regisztrációja. <br />
          Kérjük várjon türelemmel!
        </p>
      ) : (
        <p>
          Üdvözöljük az oldal teszt verziójában,
          <br /> {user.firstname} {user.lastname}!
        </p>
      )}
    </main>
  );
};

export default Home;
