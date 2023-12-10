import React, { useContext } from 'react'

import { List } from '../../../types/list';
import { UserContext } from '../../../context/UserContext';

import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DoneIcon from "@mui/icons-material/Done";
import { useTranslation } from 'react-i18next';

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
    const {t} = useTranslation()
    const { user } = useContext(UserContext);

    return (
        <div className={""}>
            <div className="flex flex-col sm:flex-row items-center justify-between">
        {isEditingName ? (
            <input
                type="text"
                value={listName}
                className="border rounded-md px-2 mb-2 sm:mb-0 dark:bg-gray-500 dark:text-white"
                onChange={(e) => setListName(e.target.value)}
            />
        ) : (
            <p className="text-lg font-bold text-orange-300 py-5 md:py-0">{list?.name}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
                <input 
                    type='text' 
                    value={newItem} 
                    onChange={hanndleNewItemChange} 
                    placeholder={t("pages.list.newItem")} 
                    className="border rounded-md px-2 h-8 dark:bg-gray-800 dark:text-white" 
                />
                <AddBoxIcon sx={{ fontSize: "30px", cursor: "pointer" }} className={"dark:text-white"} onClick={handleAddItem} />
            </div>
            {list && user && user.uuid === list.owner.uuid && (
                <div className={"flex flex-row gap-4"}>
                    <GroupIcon sx={{ fontSize: "30px", cursor: "pointer" }} className={"dark:text-white"} onClick={() => setShowUserEdit(true)} />
                    {isEditingName ? (
                        <DoneIcon sx={{ fontSize: "30px", cursor: "pointer" }} className={"dark:text-white"} onClick={handleNameChange} />
                    ) : (
                        <SettingsIcon sx={{ fontSize: "30px", cursor: "pointer" }} className={"dark:text-white"} onClick={() => setIsEditingName(true)} />
                    )}
                </div>
            )}
            {list && user && user.uuid !== list.owner.uuid && (
                <button className="border border-red-500 text-red-500 px-2 rounded-md hover:bg-red-500 hover:text-white py-1" onClick={handleLeaveList}>
                    {t("pages.list.leave")}
                </button>
            )}
        </div>
    </div>
        </div>
    )
}
