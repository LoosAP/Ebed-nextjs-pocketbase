import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api_Url } from "./consts";

export const useUser = () => {
  const nextCookies = cookies();
  const pb_auth = nextCookies.get("pb_auth");
  let user = null;
  if (pb_auth) {
    user = JSON.parse(pb_auth.value);
    return user;
  } else {
    return null;
  }
};

export const useUserProtected = () => {
  const nextCookies = cookies();
  const pb_auth = nextCookies.get("pb_auth");
  let user = null;
  if (!pb_auth) {
    redirect("/account/login");
  } else {
    user = JSON.parse(pb_auth.value);
  }
  return user;
};

export const checkLoggedIn = () => {
  const nextCookies = cookies();
  const pb_auth = nextCookies.get("pb_auth");
  if (pb_auth) {
    redirect("/");
  }
};

export const checkPrivileges = async () => {
  const user = await getUserData();
  const privilege = user?.privilege;
  return privilege;
};

export const checkLoginEnabled = async () => {
  const user = await getUserData();
  const loginEnabled = user?.can_login;
  return loginEnabled;
};

export const getUserData = async () => {
  const user = useUser();
  const id = user?.model?.id;
  const userData = await fetch(
    `${api_Url}collections/users/records/${id}`
  ).then((res) => res.json());
  return userData;
};

export const getUserDataById = async (id) => {
  const userData = await fetch(
    `${api_Url}collections/users/records/${id}`
  ).then((res) => res.json());
  return userData;
};
