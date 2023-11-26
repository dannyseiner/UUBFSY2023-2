import React, { useContext, useState } from 'react'
import { ShoppingListsContext } from '../context/ShoppingLists'
import { List } from '../types/list'
import { UserContext } from '../context/UserContext'

import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Link, useNavigate } from 'react-router-dom';

export default function CreateShoppingList() {
    const { shoppingLists, setShoppingLists } = useContext(ShoppingListsContext)
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
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
                navigate(`/list/${newList.uuid}`)

            } else {
                alert("Přihlašte se")
            }

        } else {
            alert("Vyplňte název listu")
        }
    }

    return (
        <div>
            <div className={"flex justify-center items-center h-screen mt-[-100px]"}>
                <div className={"w-[400px] flex flex-col bg-white rounded-xl px-[20px] pb-[40px] pt-[20px] relative gap-[20px]"}>
                    <div>
                        <h1 className={"text-2xl font-semibold text-center"}>Vytvořit nový list</h1>
                    </div>
                    <div className={"absolute top-[23px] left-[10px]"}>
                        <Link to={"/"}>
                            <KeyboardReturnIcon />
                        </Link>
                    </div>
                    <input type={"text"} value={name} onChange={handleNameChange} className={"border border-gray-300 px-4 py-2 rounded-md mt-[30px]"} placeholder={"Název listu"} />
                    <button onClick={() => handleAddList()} className={"font-medium bg-orange-500 rounded-md w-fit px-4 py-2 mx-auto mt-[10px]"}>Vytvořit</button>
                </div>
            </div>
        </div>
    )
}
