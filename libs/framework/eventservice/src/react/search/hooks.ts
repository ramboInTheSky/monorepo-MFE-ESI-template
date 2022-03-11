import {SearchESB, SearchContractModel} from "../../events/search"
import {useCommonObservable} from "../useObservable"

export const useSearchObservable = (callback: (data: SearchContractModel) => void) => {
    return useCommonObservable(new SearchESB(), callback)
}
