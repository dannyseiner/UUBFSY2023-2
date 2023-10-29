import React from "react";
import Navbar from "../../components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className={"mt-[100px] w-full h-full"}>{children}</div>
    </div>
  );
}
