const common = {
    "pages":{
        homepage:{
            "lists":"Shopping lists",
            "create":"Create new list",
        },
        create:{
            createList: "Create new list",
            create:"Create",
            input:"List name",
        },
        list:{
            users:"Users",
            leave:"Leave list",
            newItem:"New item",
        }
    },
    "components":{
        "navbar": {
            "title": "Shopping List",
            "links": {
                "home": "Home",
            }
        }
    },
    "global":{
        "deleteConfirm":"Are you sure you want to delete this list?",
        "delete":"Delete",
        "listDeleted":"List was deleted",
        filter:{
            "all":"All",
            "active":"Active",
            "completed":"Completed",
        }
    },
    errors:{
        "unauth":"You are not logged in",
        "notFound":"List not found",
        "required":"Fill all fields is required",
        unknown: "Unknown error",
    }
}

export default common;