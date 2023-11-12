import React, { useContext, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const onlyAuth = ["/list/create", "/list/"];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useContext(UserContext)
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      if (onlyAuth.includes(location.pathname)) {
        alert("Pouze pro přihlášené uživatele.");
        window.location.href = "/";
      }
    }
  }, [location])
  return (
    <div>
      <Navbar />
      <div className={"mt-[100px] w-full h-full"}>{children}</div>
    </div>
  );
}
