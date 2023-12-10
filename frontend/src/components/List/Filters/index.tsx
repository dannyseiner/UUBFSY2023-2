import React, { useEffect, useState } from 'react'

import { List } from '../../../types/list'
import { useTranslation } from 'react-i18next'

type FilterProps = {
    list: List | undefined
    setList: (value: List) => void
}

export default function FilterMenu({ list, setList }: FilterProps) {
    const {t} = useTranslation()
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
            {renderFilterButton(t("global.filter.all"), () => setFilterBy("all"))}
            {renderFilterButton(t("global.filter.active"), () => setFilterBy("archived"))}
            {renderFilterButton(t("global.filter.completed"), () => setFilterBy("unarchived"))}
        </div>
    )
}
