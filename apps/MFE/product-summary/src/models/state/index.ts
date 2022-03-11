import {ProductSummaryState} from "../ProductSummary"
import {LazyloadState} from "../Lazyload"
import {RequestState} from "../Request"
import {TextModel} from "../Text"

interface State {
    productSummary: ProductSummaryState
    textAlignment: string
    lazyload: LazyloadState
    request: RequestState
    text: TextModel
}

export default State
