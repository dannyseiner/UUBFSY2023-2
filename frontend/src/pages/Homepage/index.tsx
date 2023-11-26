import { useContext, useEffect, useState } from "react";
import { mockLists } from "../../data/lists";
import { List } from "../../types/list";
import { Link } from "react-router-dom";
import { ShoppingListsContext } from "../../context/ShoppingLists";
import { UserContext } from "../../context/UserContext";
import { useShoppingLists } from "../../components/api/Queries/useShoppingLists";
import Loader from "../../components/Loader";

export default function Homepage() {
  const {data, isLoading} = useShoppingLists()
  const { shoppingLists, setShoppingLists } = useContext(ShoppingListsContext)
  const [lists, setLists] = useState<List[]>(mockLists);
  const { user } = useContext(UserContext)

  const handleDeleteShoppingList = (list: List) => {
    if (window.confirm("Přejete si smazat list?")) {
      const _lists = shoppingLists.filter((_list) => _list.uuid !== list.uuid)
      setShoppingLists(_lists)
      alert("List smazán")
    }
  }

  useEffect(() => {
    if(data) setLists(data)
  }, [data])

  useEffect(() => {
    const _lists = shoppingLists.filter((list) => list.owner.uuid === user?.uuid || list.users.find((user) => user.uuid === user?.uuid))
    setLists(_lists)
  }, [shoppingLists, user, data])

  return (
    <div>
      {isLoading ?? <Loader />}
      <div className={"flex justify-center"}>
        <div className={"w-[80%] flex flex-col gap-[20px]"}>
          <div className={"flex justify-between"}>
            <p className={"text-[24px] font-bold"}>Nákupní seznamy</p>
            <div className={"flex gap-[10px]"}>
              <div className={"flex items-center gap-[10px] cursor-pointer"}>
                <p className={"text-[18px] font-bold text-orange-400"}>+</p>
                <Link className={"text-[18px] font-bold text-orange-400"} to={"/list/create"}>
                  Vytvořit seznam
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
                        Smazat
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
