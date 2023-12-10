import React, { useContext, useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { User } from "../../types/user";
import { mockUsers } from "../../data/users";
import { MenuItem, Select } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";

type Link = {
  label: string;
  href: string;
};

const links: Link[] = [
  {
    label: "Home",
    href: "/",
  },
];

export default function Navbar() {
  const {t} = useTranslation()
  const { user, setUser } = useContext(UserContext);
  const [loggedUser, setLoggedUser] = useState<string | undefined>(
    user?.uuid || undefined
  );

  const handleUserChange = (e: any) => {
    setLoggedUser(e.target.value);
  };

  useEffect(() => {
    if (loggedUser) {
      const user = mockUsers.find((user) => user.uuid === loggedUser);
      if (user) {
        setUser(user);
      }
    }
  }, [loggedUser]);

  return (
    <div
      className={
        "fixed top-[20px] w-[80%] left-[10%] flex items-center justify-between bg-[rgba(255,255,255,0.8)] shadow-2xl px-4 py-2 rounded-xl font-bold"
      }
    >
      <Link to={"/"} className={"text-[18px] text-orange-400"}>
        {t("components.navbar.title")}
      </Link>
      <div className={"flex gap-[10px] items-center"}>
        {links.map((link, index) => (
          <div key={index} onClick={() => redirect(link.href)}>
            <p>{link.label}</p>
          </div>
        ))}
        <LanguageSwitcher />
        <Select
          labelId="user-select"
          value={loggedUser}
          label="name"
          onChange={handleUserChange}
          className={"h-[30px]"}
        >
          {mockUsers.map((user) => (
            <MenuItem value={user.uuid} key={user.uuid}>{user.name}</MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
