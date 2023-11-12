import React, { useContext, useState } from 'react'
import { ShoppingListsContext } from '../context/ShoppingLists'
import { List } from '../types/list'
import { UserContext } from '../context/UserContext'

import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Link } from 'react-router-dom';

export default function CreateShoppingList() {
    const { shoppingLists, setShoppingLists } = useContext(ShoppingListsContext)
    const { user } = useContext(UserContext)
    const [name, setName] = useState<string>("")
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)

    const handleAddList = () => {
        if (name) {
            if (user) {
                const newList: List = {
                    uuid: Math.random().toString(36).substr(2, 9),
                    name,
                    items: [],
                    users: [],
                    owner: user
                }
                setShoppingLists([...shoppingLists, newList])
                setName("")
                alert("List vytvořen")
            } else {
                alert("Přihlašte se")
            }

        } else {
            alert("Vyplňte název listu")
        }
    }

    return (
        <div>
            <div className={"flex justify-center"}>
                <div className={"w-[300px] flex flex-col bg-white rounded-xl px-[20px] py-[40px] relative gap-[20px]"}>
                    <div className={"absolute top-[10px] left-[10px]"}>
                        <Link to={"/"}>
                            <KeyboardReturnIcon />
                        </Link>
                    </div>
                    <input type={"text"} value={name} onChange={handleNameChange} className={"border border-gray-300 px-4 py-2 rounded-md"} placeholder={"Název listu"} />
                    <button onClick={() => handleAddList()}>Vytvořit</button>
                </div>
            </div>
        </div>
    )
}
