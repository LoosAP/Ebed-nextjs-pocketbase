"use client";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Avatar, ButtonLink } from "./UI";
import { LogoutButton } from "./auth";
const NavbarDropdown = ({ user, privileges }) => {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => {
    setExpanded(!expanded);
  };
  return (
    <div className={`flex justify-end items-center md:hidden`}>
      {expanded ? (
        <div className="absolute top-0 right-0 z-10">
          <div className="fixed inset-0 z-10" onClick={handleToggle}></div>
          <div className="absolute z-20 top-1 right-3">
            <div className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="relative grid gap-4 p-3">
                <p className="flex items-start p-3 -m-3 rounded-lg ">
                  <Avatar
                    user={user}
                    className={`mx-4 text-base font-medium text-secondary`}
                  />
                </p>
                {privileges === "admin" ? (
                  <>
                    <ButtonLink href={"/admin/manage_users"}>
                      <div className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50">
                        <div className="mx-4">Felhasználók kezelése</div>
                      </div>
                    </ButtonLink>
                    <ButtonLink href={"/admin/send_mail"}>
                      <div className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50">
                        <div className="mx-4">Levél küldése</div>
                      </div>
                    </ButtonLink>
                  </>
                ) : privileges === "vendor" ? (
                  <>
                    <ButtonLink href={"/vendor/summary"}>
                      <div className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50">
                        <div className="mx-4">Összegzés</div>
                      </div>
                    </ButtonLink>
                    <ButtonLink href={"/vendor/menu"}>
                      <div className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50">
                        <div className="mx-4">Menü</div>
                      </div>
                    </ButtonLink>
                    <ButtonLink href={"/vendor/order_requests"}>
                      <div className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50">
                        <div className="mx-4">Kérelmek</div>
                      </div>
                    </ButtonLink>
                    <ButtonLink href={"/vendor/manage_orders"}>
                      <div className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50">
                        <div className="mx-4">Rendelések</div>
                      </div>
                    </ButtonLink>
                    <ButtonLink href={"/vendor/food"}>
                      <div className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50">
                        <div className="mx-4">Ételek</div>
                      </div>
                    </ButtonLink>
                    <ButtonLink href={"/vendor/price"}>
                      <div className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50">
                        <div className="mx-4">Árak</div>
                      </div>
                    </ButtonLink>
                    <ButtonLink href={"/vendor/manage_balance"}>
                      <div className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50">
                        <div className="mx-4">Egyenlegek</div>
                      </div>
                    </ButtonLink>
                  </>
                ) : privileges === "user" ? (
                  <>
                    <ButtonLink href={`/user/${user?.id}/my_orders`}>
                      <div className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50">
                        <div className="mx-4">Rendeléseim</div>
                      </div>
                    </ButtonLink>
                    <ButtonLink href={`/user/${user?.id}/new_order`}>
                      <div className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50">
                        <div className="mx-4">Új rendelés</div>
                      </div>
                    </ButtonLink>
                  </>
                ) : (
                  <></>
                )}
                <div className="flex items-end justify-end p-3 -m-3 rounded-lg hover:bg-gray-50">
                  <div className="mx-4">
                    <LogoutButton />
                  </div>
                </div>

                {/* <a
                  href="#"
                  className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900">
                      Sign out
                    </p>
                  </div>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div onClick={handleToggle}>
          <HamburgerMenuIcon />
        </div>
      )}
    </div>
  );
};

export default NavbarDropdown;
