import { useState } from "react";
import { mockLists } from "../../data/lists";
import { List } from "../../types/list";
import { Link, redirect } from "react-router-dom";

export default function Homepage() {
  const [lists, setLists] = useState<List[]>(mockLists);

  return (
    <div>
      <div className={"flex justify-center"}>
        <div className={"w-[80%] flex flex-col gap-[20px]"}>
          <div className={"flex justify-between"}>
            <p className={"text-[24px] font-bold"}>Shopping Lists</p>
            <div className={"flex gap-[10px]"}>
              <div className={"flex items-center gap-[10px] cursor-pointer"}>
                <p className={"text-[18px] font-bold text-orange-400"}>+</p>
                <p className={"text-[18px] font-bold text-orange-400"}>
                  New List
                </p>
              </div>
            </div>
          </div>
          <div className={"flex flex-col gap-[10px]"}>
            {lists.map((list, index) => (
              <Link
                to={`/list/${list.uuid}`}
                key={index}
                className={
                  "flex items-center justify-between bg-[rgba(255,255,255,0.8)] shadow-2xl px-4 py-2 rounded-xl"
                }
              >
                <p className={"text-[18px] font-bold"}>{list.name}</p>
                <div className={"flex gap-[10px]"}>
                  <div
                    className={"flex items-center gap-[10px] cursor-pointer"}
                  >
                    <p className={"text-[18px] font-bold text-orange-400"}>+</p>
                    <p className={"text-[18px] font-bold text-orange-400"}>
                      New Item
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
