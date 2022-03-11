// TODO scaffold shopping bag to be implement in minibag PBI
import {Reducer} from "redux"
import {GetBagCallbackContractModel} from "@monorepo/eventservice"
import {ShoppingBag} from "../../models/shoppingbag"
import type State from "../state"
import {getItemImageUrl} from "../../utils/getMiniShoppingbagItemImageUrl"
import {getOrigin} from "../../utils/getOrigin"
import {excludeIncentives} from "../../utils/excludeIncentives"

export type ShoppingBagDuckState = {
    itemCount: number
    bag: ShoppingBag
    loading: boolean
}

export const SET_BAG = "SET_BAG"

type Action = {
    type: typeof SET_BAG
    payload: ShoppingBagDuckState
}

export const setBag = (payload: ShoppingBagDuckState) => ({
    type: SET_BAG,
    payload,
})

export const updateBag = (getBagData: GetBagCallbackContractModel) => (dispatch: any, getState: any) => {
    const {
        request: {siteUrl},
    } = getState() as State

    if (getBagData.success) {
        const bag = getBagData.data.ShoppingBag
        bag.Items = bag.Items.reverse().map(item => ({
            ...item,
            itemImageUrl: getItemImageUrl(item),
            Url: `${siteUrl ? getOrigin(siteUrl) : ""}${item.Url}`,
        }))
        const itemCount = getBagData.data.ShoppingBag.ItemCount
        if (bag.ChargesAndIncentives && bag.ChargesAndIncentives.length > 0) {
            bag.ChargesAndIncentives = excludeIncentives(bag.ChargesAndIncentives)
        }
        dispatch(setBag({itemCount, bag, loading: false}))
    } else {
        dispatch(setBag(initialState))
    }
}

export const addEVoucherToBag = (getBagData: GetBagCallbackContractModel) => (dispatch: any, getState: any) => {
    const {
        shoppingBag: {bag},
    } = getState() as State
    if (getBagData.success) {
        const bagForEVoucher = getBagData.data.Bag != null ? getBagData.data.Bag : bag
        const {itemCount, items} = bagForEVoucher
        const updatedbag = {items, itemCount, ...bag} as ShoppingBag
        dispatch(setBag({itemCount, bag: updatedbag, loading: false}))
    } else {
        dispatch(setBag(initialState))
    }
}

const initialState: ShoppingBagDuckState = {
    itemCount: 0,
    bag: {} as ShoppingBag,
    loading: true,
}

const reducer: Reducer<ShoppingBagDuckState, Action> = (state = initialState, action) => {
    switch (action.type) {
        case SET_BAG:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default reducer
