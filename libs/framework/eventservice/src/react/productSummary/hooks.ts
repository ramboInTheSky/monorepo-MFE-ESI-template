import {useCommonObservable} from "../useObservable"
import {HydrateProductSummaryESB} from "../../events/productSummary/hydrate"

export const useProductSummaryHydrateObservable = (callback: () => void) => {
    return useCommonObservable(new HydrateProductSummaryESB(), callback)
}
