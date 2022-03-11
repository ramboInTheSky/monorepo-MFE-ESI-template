/* eslint-disable @typescript-eslint/camelcase */
import {GTM_PRODUCT_IMPRESSIONS_EVENT} from "../../config/constants"
import {publishProductImpressions} from "../../events"
import {getIndexByProductID} from "../getIndexByProductID"

interface OnPageLoadGtmProps {
    productId: string
    productTitle: string
    price: string
    colour: string
    currencyCode: string
    department: string
    searchKeyword: string    
}

export const onPageLoadGtmTrigger = ({
    productId,
    productTitle,
    price,
    colour,
    currencyCode,
    department,
    searchKeyword
}: OnPageLoadGtmProps, ) => {
    /* 
    Explanation for the mix of nulls and empty strings: 
    We don't receive all the data from the ProductSummary API that we need to send over. Those values are being sent as null atm.
    The other properties are not needed/were not asked for at the time of working on PBI 15255  
  */
    
    publishProductImpressions(GTM_PRODUCT_IMPRESSIONS_EVENT, {
        ecommerce: {
            currencyCode,
            impressions: {
                id: productId,
                name: productTitle,
                price,
                brand: null,
                category: department,
                position: getIndexByProductID(productId),
                list: searchKeyword,
                dimension21: null,
                dimension22: "",
                dimension23: department,
                dimension24: null,
                dimension25: "",
                dimension26: "",
                dimension27: "",
                dimension28: colour,
                dimension43: null,
            },
        },
    })
}
