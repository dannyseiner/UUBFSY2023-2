import { useContext, useEffect, useState } from "react";
import { mockLists } from "../../data/lists";
import { List } from "../../types/list";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useShoppingLists } from "../../components/api/Queries/useShoppingLists";
import Loader from "../../components/Loader";
import { api } from "../../components/api";
import { useTranslation } from "react-i18next";

export default function Homepage() {
  const {data, isLoading} = useShoppingLists()
  const [lists, setLists] = useState<List[]>(mockLists);
  const { user } = useContext(UserContext)
  const {t} = useTranslation()

  const handleDeleteShoppingList = (list: List) => {
    if (window.confirm(t("global.deleteConfirm"))) {
      api.delete("/shopping-list/" + list.uuid)
      alert(t("global.listDeleted"))
    }
  }

  useEffect(() => {
    if(data) setLists(data)
  }, [data])

  return (
    <div>
      {isLoading ?? <Loader />}
      <div className={"flex justify-center"}>
        <div className={"w-[80%] flex flex-col gap-[20px]"}>
          <div className={"flex justify-between flex-col sm:flex-row"}>
            <p className={"text-[24px] font-bold"}>{t("pages.homepage.lists")}</p>
            <div className={"flex gap-[10px]"}>
              <div className={"flex items-center gap-[10px] cursor-pointer"}>
                <p className={"text-[18px] font-bold text-orange-400"}>+</p>
                <Link className={"text-[18px] font-bold text-orange-400"} to={"/list/create"}>
                  {t("pages.homepage.create")}
                </Link>
              </div>
            </div>
          </div>
          <div className={"flex flex-col gap-[10px]"}>
            {user && lists.map((list, index) => (
              <div
                key={index}
                className={
                  "flex items-center justify-between bg-[rgba(255,255,255,0.8)] shadow-2xl px-4 py-2 rounded-xl"
                }
              >
                <Link className={"text-[18px] font-bold"} to={`/list/${list.uuid}`}>{list.name}</Link>
                {list.owner.uuid === user.uuid && (
                  <div className={"flex gap-[10px]"} onClick={() => handleDeleteShoppingList(list)}>
                    <div
                      className={"flex items-center gap-[10px] cursor-pointer"}
                    >
                      <p className={"text-[18px] font-bold text-orange-400"}>
                        {t("global.delete")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

