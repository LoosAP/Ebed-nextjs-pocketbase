import { api_Url } from "@/utils/consts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Avatar = ({ user, className }) => {
  return (
    <Link href={`/settings/edit`}>
      <div className={className}>
        <p>Üdv, {user?.username}</p>
      </div>
    </Link>
  );
};

export default Avatar;
