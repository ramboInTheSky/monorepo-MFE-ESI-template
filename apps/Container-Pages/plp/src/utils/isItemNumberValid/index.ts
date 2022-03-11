import {ITEM_NUMBER_REGEX} from "../../config/constants"

const isItemNumberValid = (itemNumber: string): boolean => {
    return ITEM_NUMBER_REGEX.test(itemNumber)
}

export default isItemNumberValid
