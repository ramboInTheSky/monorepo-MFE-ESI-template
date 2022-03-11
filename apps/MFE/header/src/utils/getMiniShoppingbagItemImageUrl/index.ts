import env from "../../config/env"
import {
    SOFA_CATEGORY,
    SOFA_CONTENT,
    COMMON_ITEM_IMAGE_URL,
    ITEM_ADD_TO_BAG_URL,
    JPG,
    IMAGE,
    UNDERSCORE,
} from "../../config/constants"
import {Item, FieldValue} from "../../models/shoppingbag"

export const getImageUrl = (fields: FieldValue[]) => {
    const imageField = fields.find(f => f.Field === IMAGE)
    if (imageField) return imageField?.Value
}

export const getItemImageUrl = (item: Item): string => {
    const {
        LinkedItems,
        ItemNumber,
        OptionNo,
        ItemCategory,
        Personalisation,
        PersonalisationFields,
        CustomItemFields,
    } = item
    const linkedItemNumber =
        LinkedItems && LinkedItems?.length > 0 && LinkedItems[0].ItemNumber !== ""
            ? `${UNDERSCORE}${LinkedItems[0].ItemNumber}`
            : ""
    let itemImageUrl = `${env.REACT_APP_CDN_BASEURL}${COMMON_ITEM_IMAGE_URL}${ItemNumber}${JPG}`
    const itemUrl = `${ITEM_ADD_TO_BAG_URL}${ItemNumber}${UNDERSCORE}${OptionNo}${linkedItemNumber}${JPG}`

    if (ItemCategory === SOFA_CATEGORY) {
        itemImageUrl = `${env.REACT_APP_CDN_BASEURL}/${SOFA_CONTENT}${itemUrl}`
    } else if (Personalisation === "Y") {
        if (PersonalisationFields.length > 0) {
            itemImageUrl = getImageUrl(PersonalisationFields) || itemImageUrl
        } else if (CustomItemFields.length > 0) {
            itemImageUrl = getImageUrl(CustomItemFields) || itemImageUrl
        }
    }
    return itemImageUrl
}
