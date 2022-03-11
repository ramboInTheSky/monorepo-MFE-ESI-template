/* istanbul ignore file */

import getWindow from "../../utils/window"

// Tactical solution to allow MVC to subscribe to events before header has initialsed them
// Only needed as MVC has no access to the ESB
// Will be removed once MVC has applied similar changes
const inialiseGlobalEvents = () => {
    const window = getWindow() as any
    if (!window) return
    window.subjects.setupEvent("$ SHOPPING_BAG_GET")
    window.subjects.setupEvent("$ SHOPPING_BAG_GET_CALLBACK")
    window.subjects.setupEvent("$ FAVOURITES_GET")
    window.subjects.setupEvent("$ FAVOURITES_GET_CALLBACK")

    window.subjects.setupEvent("$ SHOPPING_BAG_UPDATE_SIZE_CALLBACK")
    window.subjects.setupEvent("$ SHOPPING_BAG_UPDATE_QUANTITY_CALLBACK")
    window.subjects.setupEvent("$ SHOPPING_BAG_ADD_CALLBACK")
    window.subjects.setupEvent("$ SHOPPING_BAG_ADD_CIST_CALLBACK")
    window.subjects.setupEvent("$ SHOPPING_BAG_ADD_EVOUCHER_CALLBACK")
    window.subjects.setupEvent("$ SHOPPING_BAG_ADD_LINKED_ITEM_CALLBACK")
    window.subjects.setupEvent("$ SHOPPING_BAG_ADD_MULTIPLE_CALLBACK")
    window.subjects.setupEvent("$ SHOPPING_BAG_ADD_WARRANTY_CALLBACK")
    window.subjects.setupEvent("$ SHOPPING_BAG_REMOVE_CALLBACK")
    window.subjects.setupEvent("$ SHOPPING_BAG_ADD")
    window.subjects.setupEvent("$ SHOPPING_BAG_ADD_CIST")
    window.subjects.setupEvent("$ SHOPPING_BAG_ADD_EVOUCHER")
    window.subjects.setupEvent("$ SHOPPING_BAG_ADD_LINKED_ITEM")
    window.subjects.setupEvent("$ SHOPPING_BAG_ADD_MULTIPLE")
    window.subjects.setupEvent("$ SHOPPING_BAG_ADD_WARRANTY")
    window.subjects.setupEvent("$ SHOPPING_BAG_REMOVE")
}

export default inialiseGlobalEvents
