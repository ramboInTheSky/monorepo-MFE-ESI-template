import {useCommonObservable} from "../useObservable"
import {GetVisitorTokenCallback, ClearVisitorTokenCallback, GetVisitorTokenCallbackContractModel} from "../../events/visitor/getToken"

export const useGetVisitorTokenCallbackObservable = (callback: (data: GetVisitorTokenCallbackContractModel) => void) => {
    return useCommonObservable(new GetVisitorTokenCallback(), callback)
}

export const useClearVisitorTokenCallbackObservable = (callback: () => void) => {
    return useCommonObservable(new ClearVisitorTokenCallback(), callback)
}