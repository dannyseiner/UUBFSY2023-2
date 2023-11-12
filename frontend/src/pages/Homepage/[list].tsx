import React, { useState, useEffect, useContext } from "react";
import { redirect, useParams } from "react-router-dom";

import { mockLists } from "../../data/lists";
import { List } from "../../types/list";
import { Item } from "../../types/item";
import Drawer from "../../components/Drawer";
import { User } from "../../types/user";
import { UserContext } from "../../context/UserContext";

// ICONS
import DeleteIcon from "@mui/icons-material/Delete";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ListAdminPanel from "../../components/List/ListAdminPanel";
import FilterMenu from "../../components/List/Filters";
import { ShoppingListsContext } from "../../context/ShoppingLists";

export default function ShoppingList() {
  const { shoppingLists, setShoppingLists } = useContext(ShoppingListsContext);
  const { user } = useContext(UserContext);
  const { listUuid } = useParams();
  const [list, setList] = useState<List>();
  const [filteredList, setFilteredList] = useState<List>();

  const [showUserEdit, setShowUserEdit] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<string>("");
  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewUser(e.target.value);

  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [listName, setListName] = useState<string>(list?.name || "");

  const [newItem, setNewItem] = useState<string>("");
  const hanndleNewItemChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewItem(e.target.value);

  useEffect(() => {
    if (listUuid && shoppingLists) {
      const list = shoppingLists.find((list) => list.uuid === listUuid);
      if (list) {
        setList(list);
      } else {
        alert("List not found");
        redirect("/");
      }
    }
  }, [listUuid]);

  // SAVE LIST TO CONTEXT
  useEffect(() => {
    if (list) {
      const _lists = shoppingLists.map((_list) => {
        if (_list.uuid === list.uuid) {
          return list
        } else {
          return _list
        }
      })
      setShoppingLists(_lists)
    }
  }, [list])

  useEffect(() => {
    if (list && list.name) {
      setListName(list.name);
    }
    if (list) {
      setFilteredList(list);
    }
  }, [list]);

  // @Function: rules
  // @Description:
  // State 0: item is not archived
  // State 1: item is archived
  const handleItemArchiveChange = (item: Item, state: boolean) => {
    if (state) {
      const _items: Item[] | undefined = list?.items.map((_item) => {
        if (_item.uuid === item.uuid) {
          return { ..._item, archived: true };
        } else {
          return _item;
        }
      });
      if (_items && list) {
        setList({ ...list, items: _items });
      } else {
        alert("Something went wrong");
      }
    } else {
      const _items: Item[] | undefined = list?.items.map((_item) => {
        if (_item.uuid === item.uuid) {
          return { ..._item, archived: false };
        } else {
          return _item;
        }
      });

      if (_items && list) {
        setList({ ...list, items: _items });
      } else {
        alert("Something went wrong");
      }
    }
  };

  const handleItemRemove = (item: Item) => {
    if (list?.items) {
      const _items = list.items.filter((e) => item !== e);
      setList({ ...list, items: _items });
    }
  };

  const handleNameChange = () => {
    if (listName && list) {
      setList({ ...list, name: listName });
      setIsEditingName(false);
    }
  };

  const handleRemoveUser = (user: User) => {
    if (list) {
      const _users = list.users.filter((e) => e !== user);
      setList({ ...list, users: _users });
    }
  };

  const handleAddUser = () => {
    if (newUser && list) {
      const _users = [
        ...list.users,
        { name: newUser, uuid: Math.random().toString() },
      ];
      setList({ ...list, users: _users });
      setNewUser("");
    }
  };

  const handleAddItem = () => {
    if (newItem && list) {
      const _items = [
        ...list.items,
        { name: newItem, uuid: Math.random().toString(), archived: false },
      ];
      setList({ ...list, items: _items });
      setNewItem("");
    }
  };

  const handleLeaveList = () => {
    if (list && user && user.uuid !== list.owner.uuid) {
      const _users = list.users.filter((_user) => _user.uuid !== user.uuid);
      setList({ ...list, users: _users });
      window.location.href = "/";
    }
  }

  return (
    <>
      <Drawer
        backgroundBlur
        open={showUserEdit}
        setOpen={(e) => setShowUserEdit(e)}
      >
        <p className={"font-bold text-[16px]"}>Users management</p>
        <div className={"w-full flex items-center gap-[10px] py-4"}>
          <input
            type={"text"}
            className={"border rounded-md flex-1"}
            onChange={handleNewUserChange}
            value={newUser}
          />
          <PersonAddIcon
            sx={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => handleAddUser()}
          />
        </div>
        <div className={"flex flex-col"}>
          {list &&
            list.users.map((user) => (
              <div className={"flex items-center justify-between"} key={user.uuid}>
                <p>{user.name}</p>
                <PersonRemoveIcon
                  sx={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={() => handleRemoveUser(user)}
                />
              </div>
            ))}
        </div>
      </Drawer>

      <div className={"w-[80%] bg-white mx-auto rounded-lg px-4 py-6"}>
        <div className={"flex items-center justify-between"}>
          <FilterMenu list={list} setList={(e: List) => setFilteredList(e)} />
        </div>
        <ListAdminPanel isEditingName={isEditingName} setIsEditingName={setIsEditingName} listName={listName} setListName={setListName} newItem={newItem} setNewItem={setNewItem} hanndleNewItemChange={hanndleNewItemChange} handleAddItem={handleAddItem} list={list} setShowUserEdit={setShowUserEdit} handleNameChange={handleNameChange} handleLeaveList={handleLeaveList} />
        <div className={"flex flex-col my-[10px] gap-[10px]"}>
          {filteredList &&
            filteredList?.items.map((item) => (
              <div
                key={item.uuid}
                className={"flex items-center justify-between"}
              >
                <div
                  className={"flex items-center gap-[10px]"}
                  onClick={() => handleItemArchiveChange(item, !item.archived)}
                >
                  <input type={"checkbox"} checked={item.archived} />
                  <p
                    className={`${item.archived ? "line-through text-gray-300" : ""
                      }`}
                  >
                    {item.name}
                  </p>
                </div>
                <div className={"flex gap-[10px]"}>
                  <div
                    onClick={() => handleItemRemove(item)}
                    className={
                      "border border-orange-500 text-orange-500 flex items-center justify-center p-2 rounded-md cursor-pointer hover:bg-orange-500 hover:text-white transition-all"
                    }
                  >
                    <DeleteIcon sx={{ fontSize: "20px" }} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
