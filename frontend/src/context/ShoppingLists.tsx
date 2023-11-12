import React, { createContext, useState } from "react";
import { List } from "../types/list";

type ShoppingListContext = {
    shoppingLists: List[];
    setShoppingLists: (List: List[]) => void;
};

const defaultShoppingListContext: ShoppingListContext = {
    shoppingLists: [],
    setShoppingLists: () => { },
};

export const ShoppingListsContext = createContext<ShoppingListContext>(defaultShoppingListContext);

export const ShoppingListProvider = ({ children }: { children: React.ReactNode }) => {
    const [shoppingLists, setShoppingLists] = useState<List[]>([]);

    return (
        <ShoppingListsContext.Provider value={{ shoppingLists, setShoppingLists }}>
            {children}
        </ShoppingListsContext.Provider>
    );
};
