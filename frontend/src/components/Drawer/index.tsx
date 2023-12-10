import React from "react";

// ICONS
import CloseIcon from "@mui/icons-material/Close";

type DrawerProps = {
  open: boolean;
  setOpen: (e: boolean) => void;
  children: React.ReactNode;
  className?: string;
  backgroundBlur?: boolean;
};

export default function Drawer({
  open,
  setOpen,
  children,
  className = "",
  backgroundBlur,
}: DrawerProps) {
  if (!open) return <></>;
  return (
    <>
      {backgroundBlur && (
        <div
          onClick={() => setOpen(!open)}
          className={
            "w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-10"
          }
        ></div>
      )}
      <div
        className={
          "w-[300px] right-[30px] fixed dark:bg-gray-700 bg-white shadow-2xl h-[calc(100vh-60px)] top-[30px] rounded-md p-4 transition-all z-20" +
          className
        }
      >
        <div className={"absolute top-[10px] right-[10px]"}>
          <CloseIcon
            sx={{ fontSize: "30px", cursor: "pointer" }}
            onClick={() => setOpen(!open)}
            className={"dark:text-white"}
          />
        </div>
        <div>{children}</div>
      </div>
    </>
  );
}
