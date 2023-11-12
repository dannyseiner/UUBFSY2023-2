import React, { useContext } from 'react'

import { List } from '../../../types/list';
import { UserContext } from '../../../context/UserContext';

import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DoneIcon from "@mui/icons-material/Done";
import { DeleteOutline } from '@mui/icons-material';
import { ShoppingListsContext } from '../../../context/ShoppingLists';

type AdminPanelProps = {
    isEditingName: boolean;
    setIsEditingName: (value: boolean) => void;
    listName: string;
    setListName: (value: string) => void;
    newItem: string;
    setNewItem: (value: string) => void;
    hanndleNewItemChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddItem: () => void;
    list: undefined | List;
    setShowUserEdit: (value: boolean) => void;
    handleNameChange: () => void
    handleLeaveList: () => void
}

export default function ListAdminPanel({ isEditingName, setIsEditingName, listName, setListName, newItem, handleLeaveList, hanndleNewItemChange, handleAddItem, list, setShowUserEdit, handleNameChange }: AdminPanelProps) {
    const { user } = useContext(UserContext);
    const { shoppingLists, setShoppingLists } = useContext(ShoppingListsContext)

    return (
        <div>
            <div className={"flex items-center justify-between"}>
                {isEditingName ? (
                    <input
                        type={"text"}
                        value={listName}
                        className={"border rounded-md px-2"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setListName(e.target.value)
                        }
                    />
                ) : (
                    <p className={"text-[16px] font-bold"}>{list?.name}</p>
                )}
                <div className={"flex gap-[20px]"}>
                    <div className={"flex items-center gap-[10px]"}>
                        <input type={'text'} value={newItem} onChange={hanndleNewItemChange} placeholder={"new item"} className={"border rounded-md px-2 h-[30px]"} />
                        <AddBoxIcon sx={{ fontSize: "30px", cursor: "pointer" }} onClick={() => handleAddItem()} />
                    </div>
                    {list && user && user.uuid === list.owner.uuid && (
                        <>
                            <GroupIcon
                                sx={{ fontSize: "30px", cursor: "pointer" }}
                                onClick={() => setShowUserEdit(true)}
                            />
                            {isEditingName ? (
                                <DoneIcon
                                    sx={{ fontSize: "30px", cursor: "pointer" }}
                                    onClick={() => handleNameChange()}
                                />
                            ) : (
                                <SettingsIcon
                                    sx={{ fontSize: "30px", cursor: "pointer" }}
                                    onClick={() => setIsEditingName(true)}
                                />
                            )}
                        </>
                    )}
                    {list && user && user.uuid !== list.owner.uuid && (
                        <button className={"border border-red-500 text-red-500 px-2 rounded-md hover:bg-red-500 hover:text-white py-1"} onClick={() => handleLeaveList()}>Leave</button>
                    )}
                </div>
            </div>
        </div>
    )
}
