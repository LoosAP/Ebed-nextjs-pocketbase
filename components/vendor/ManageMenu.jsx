"use client";

import Input from "@/components/UI/Inputs/Input";
import { NewMenuDropdown } from "@/components/menu";
import { pb } from "@/utils/pocketbase";
import React, { useState } from "react";
import { Alert, SubmitButton } from "../UI";
import Loading from "../UI/Loading";

const ManageMenu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aMenu, setAMenu] = useState();
  const [bMenu, setBMenu] = useState();
  const [eMenu, setEMenu] = useState();
  const [l1menu, setL1Menu] = useState();
  const [l2menu, setL2Menu] = useState();

  return <div>ManageMenu</div>;
};

export default ManageMenu;
