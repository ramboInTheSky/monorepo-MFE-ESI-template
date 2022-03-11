import {GetBagCallback, GetBagCallbackContractModel} from "../../events/shoppingBag/get"
import {useCommonObservable} from "../useObservable"
import {AddBagCallbackContractModel, AddBagCallback} from "../../events/shoppingBag/add"
import {AddCistBagCallbackContractModel, AddCistBagCallback} from "../../events/shoppingBag/addCist"
import {AddEVoucherCallback, AddEVoucherCallbackContractModel} from "../../events/shoppingBag/addEvoucher"
import {AddLinkedItemCallbackContractModel, AddLinkedItemCallback} from "../../events/shoppingBag/addLinkedItem"
import {AddMultipleCallbackContractModel, AddMultipleCallback} from "../../events/shoppingBag/addMultiple"
import {AddWarrantyCallbackContractModel, AddWarrantyCallback} from "../../events/shoppingBag/addWarranty"
import {RemoveBagCallbackContractModel, RemoveBagCallback} from "../../events/shoppingBag/remove"
import {UpdateSizeCallbackContractModel, UpdateSizeCallback} from "../../events/shoppingBag/updateSize"
import {UpdateQuantityCallbackContractModel, UpdateQuantityCallback} from "../../events/shoppingBag/updateQuantity"

export const useShoppingBagGetCallbackObservable = (callback: (data: GetBagCallbackContractModel) => void) => {
    return useCommonObservable(new GetBagCallback(), callback)
}

export const useShoppingBagAddCallbackObservable = (callback: (data: AddBagCallbackContractModel) => void) => {
    return useCommonObservable(new AddBagCallback(), callback)
}

export const useShoppingBagAddCistCallbackObservable = (callback: (data: AddCistBagCallbackContractModel) => void) => {
    return useCommonObservable(new AddCistBagCallback(), callback)
}

export const useShoppingBagAddEVoucherCallbackObservable = (
    callback: (data: AddEVoucherCallbackContractModel) => void,
) => {
    return useCommonObservable(new AddEVoucherCallback(), callback)
}

export const useShoppingBagAddLinkedItemCallbackObservable = (
    callback: (data: AddLinkedItemCallbackContractModel) => void,
) => {
    return useCommonObservable(new AddLinkedItemCallback(), callback)
}

export const useShoppingBagAddMultipleCallbackObservable = (
    callback: (data: AddMultipleCallbackContractModel) => void,
) => {
    return useCommonObservable(new AddMultipleCallback(), callback)
}

export const useShoppingBagAddWarrantyCallbackObservable = (
    callback: (data: AddWarrantyCallbackContractModel) => void,
) => {
    return useCommonObservable(new AddWarrantyCallback(), callback)
}

export const useShoppingBagRemoveCallbackObservable = (callback: (data: RemoveBagCallbackContractModel) => void) => {
    return useCommonObservable(new RemoveBagCallback(), callback)
}

export const useShoppingBagUpdateSizeCallbackObservable = (
    callback: (data: UpdateSizeCallbackContractModel) => void,
) => {
    return useCommonObservable(new UpdateSizeCallback(), callback)
}

export const useShoppingBagUpdateQuantityCallbackObservable = (
    callback: (data: UpdateQuantityCallbackContractModel) => void,
) => {
    return useCommonObservable(new UpdateQuantityCallback(), callback)
}