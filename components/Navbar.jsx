import { Avatar, ButtonLink } from "@/components/UI";
import { LogoutButton } from "@/components/auth";
import { getUserData, useUser } from "@/utils/useUser";
import {
  EnvelopeClosedIcon,
  HomeIcon,
  MobileIcon,
} from "@radix-ui/react-icons";

import NavbarDropdown from "./NavbarDropdown";

const Navbar = async () => {
  const user = useUser();
  const userData = await getUserData();
  const privileges = userData?.privilege;

  return (
    <nav className="print:hidden flex flex-row items-center justify-between bg-primary fixed w-[100%] h-[31px] text-[12px] z-50">
      <div
        className={` text-secondary pl-[10%] flex flex-row items-center justify-center`}
      >
        <a href="/">
          <HomeIcon width={20} height={20} className="pr-1" />
        </a>
        <MobileIcon width={20} height={20} className="pr-1" />
        <p>+36 52 515-715 &nbsp;</p>
        <EnvelopeClosedIcon width={20} height={20} className="pr-1" />
        <a href="mailto:info@anyrt.hu">
          <p>info@anyrt.hu</p>
        </a>
      </div>
      <div className={`flex flex-row  text-secondary font-bold pr-[10%]`}>
        {user ? (
          privileges === "user" ? (
            <>
              <div className={`md:flex md:flex-row hidden`}>
                <Avatar user={userData} />
                &nbsp; | &nbsp;
                <ButtonLink href={`/user/${userData?.id}/my_orders`}>
                  Rendeléseim
                </ButtonLink>
                &nbsp; | &nbsp;
                <ButtonLink href={`/user/${userData?.id}/new_order`}>
                  Új rendelés
                </ButtonLink>
                &nbsp; | &nbsp;
                <LogoutButton />
              </div>
              <NavbarDropdown user={userData} privileges={privileges} />
            </>
          ) : privileges === "admin" ? (
            <>
              <div className={`md:flex md:flex-row hidden`}>
                <Avatar user={userData} />
                &nbsp; | &nbsp;
                <ButtonLink href={"/admin/manage_users"}>
                  Felhasználók kezelése
                </ButtonLink>
                &nbsp; | &nbsp;
                <ButtonLink href={"/admin/send_mail"}>Levél küldése</ButtonLink>
                &nbsp; | &nbsp;
                <LogoutButton />
              </div>
              <NavbarDropdown user={userData} privileges={privileges} />
            </>
          ) : privileges === "vendor" ? (
            <>
              <div className={`md:flex md:flex-row hidden`}>
                <Avatar user={userData} />
                &nbsp; | &nbsp;
                <ButtonLink href={"/vendor/summary"}>Összegzés</ButtonLink>
                &nbsp; | &nbsp;
                <ButtonLink href={"/vendor/menu"}>Menü</ButtonLink>
                &nbsp; | &nbsp;
                <ButtonLink href={"/vendor/order_requests"}>
                  Kérelmek
                </ButtonLink>
                &nbsp; | &nbsp;
                <ButtonLink href={"/vendor/manage_orders"}>
                  Rendelések
                </ButtonLink>
                &nbsp; | &nbsp;
                <ButtonLink href={"/vendor/food"}>Ételek</ButtonLink>
                &nbsp; | &nbsp;
                <ButtonLink href={"/vendor/price"}>Árak</ButtonLink>
                &nbsp; | &nbsp;
                <ButtonLink href={"/vendor/manage_balance"}>
                  Egyenlegek
                </ButtonLink>
                &nbsp; | &nbsp;
                <LogoutButton />
              </div>
              <NavbarDropdown user={userData} privileges={privileges} />
            </>
          ) : null
        ) : (
          <ButtonLink href={"/account/login"}> Belépés</ButtonLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
