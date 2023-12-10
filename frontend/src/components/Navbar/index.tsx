import React, { useContext, useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { User } from "../../types/user";
import { mockUsers } from "../../data/users";
import { MenuItem, Select } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";


import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ModeToggle from "../modeToggle";

type Link = {
  label: string;
  href: string;
};



export default function Navbar() {
  const { t } = useTranslation()
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<string | undefined>(
    user?.uuid || undefined
  );

  const links: Link[] = [
    {
      label: t("components.navbar.links.home"),
      href: "/",
    },
  ];

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

  const renderUserSelect = () => {
    return (
      <Select
      labelId="user-select"
      value={loggedUser}
      label="name"
      onChange={handleUserChange}
      className={"h-[30px] dark:text-white"}
    >
      {mockUsers.map((user) => (
        <MenuItem value={user.uuid} key={user.uuid} className={"dark:bg-gray-600 text-black dark:text-white"}>{user.name}</MenuItem>
      ))}
    </Select>
    )
  }

  return (
    <>
      <div
        className={
          "hidden fixed top-[20px] w-[80%] left-[10%] sm:flex items-center justify-between bg-[rgba(255,255,255,0.8)] dark:bg-gray-700 shadow-2xl px-4 py-2 rounded-xl font-bold backdrop-blur dark:text-white"
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
          {renderUserSelect()}
          <ModeToggle />
        </div>
      </div>


      <div
        className={
          "block sm:hidden fixed top-[20px] w-[80%] left-[10%] items-center justify-between bg-[rgba(255,255,255,0.8)] dark:bg-gray-700 shadow-2xl px-4 py-2 rounded-xl font-bold backdrop-blur dark:text-white"
        }
      >
        <div className={"flex justify-between w-full"}>
          <Link to={"/"} className={"text-[18px] text-orange-400"}>
            {t("components.navbar.title")}
          </Link>
          {isOpen ? <CloseIcon onClick={() => setIsOpen(false)} /> : <MenuIcon onClick={() => setIsOpen(true)} />}
        </div>
        {isOpen && (
          <>
          <div className={"flex flex-col gap-[10px] mt-[40px]"}>
            {links.map((link, index) => (
              <div key={index} onClick={() => redirect(link.href)}>
                <p>{link.label}</p>
              </div>
            ))}
            <LanguageSwitcher />
            {renderUserSelect()}
            <ModeToggle />
          </div>
          </>
        )}
      </div>
    </>
  );
}
