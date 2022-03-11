import {PublishTrackEvent} from ".."
import {GTM_PRODUCT_CLICK_EVENT} from "../../../../config/constants"
import {getIndexByProductID} from "../../../../utils/getIndexByProductID"
import {getSearchKeyword} from "../../../../utils/getPLPDefaultTitle"
import removeCurrencyAndSpaces from "../../../../utils/removeCurrencyAndSpaces"

interface HandleProductClickProps {
    id: string
    title: string
    price: string
    colour: string
    currencyCode: string
    department: string
}

export const handleProductClick = ({id, title, price, colour, currencyCode, department}: HandleProductClickProps) => {
    /* 
    Explanation for the mix of nulls and empty strings: 
    We don't receive all the data from the ProductSummary API that we need to send over. Those values are being sent as null atm.
    The other properties are not needed/were not asked for at the time of working on PBI 24890  
  */
    const {href, search} = window.location
    const list = getSearchKeyword(href, search) || department
    PublishTrackEvent(GTM_PRODUCT_CLICK_EVENT, {
        ecommerce: {
            currencyCode,
            click: {
                actionField: {
                    list,
                },
            },
            products: [
                {
                    id,
                    name: title,
                    price: removeCurrencyAndSpaces(price),
                    brand: null,
                    category: null,
                    position: getIndexByProductID(id),
                    dimension21: null,
                    dimension22: "",
                    dimension23: null,
                    dimension24: null,
                    dimension25: "",
                    dimension26: "",
                    dimension27: "",
                    dimension28: colour,
                    dimension43: null,
                },
            ],
        },
    })
}
