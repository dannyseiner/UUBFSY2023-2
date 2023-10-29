import React, { useEffect, useState } from 'react'

import { List } from '../../../types/list'

type FilterProps = {
    list: List | undefined
    setList: (value: List) => void
}

export default function FilterMenu({ list, setList }: FilterProps) {
    const [filterBy, setFilterBy] = useState<"all" | "archived" | "unarchived">("all")


    useEffect(() => {
        if (list) {
            switch (filterBy) {
                case "all":
                    setList({ ...list, items: list.items })
                    break
                case "archived":
                    setList({
                        ...list,
                        items: list.items.filter(item => item.archived)
                    })
                    break
                case "unarchived":
                    setList({
                        ...list,
                        items: list.items.filter(item => !item.archived)
                    })
                    break
            }
        }

    }, [filterBy])

    const renderFilterButton = (title: string, onClick: () => void) => {
        return (
            <button onClick={onClick} className={"border rounded-md px-2 py-1"}>
                {title}
            </button>
        )
    }

    return (
        <div>
            {renderFilterButton("All", () => setFilterBy("all"))}
            {renderFilterButton("Archived", () => setFilterBy("archived"))}
            {renderFilterButton("Unarchived", () => setFilterBy("unarchived"))}
        </div>
    )
}
