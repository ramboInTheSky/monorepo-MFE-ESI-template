import type { RequestDuckState } from "../../ducks/request/types"
import type {FeaturesDuckState} from "../../ducks/feature-switch"
import type {SeoFiltersDuckState} from "../../ducks/seoFilters"
import type {ViewAllModalDuckState} from "../../ducks/viewAllModal"
import type TextAlignment from "../textAlignment"
import type {SearchState} from "../SearchState"
import type { CategoryQuickLinksState } from "../../ducks/categoryQuickLinks/types"
import type { TabbedFilterDuckState } from "../../ducks/tabbedFilters"
import {TextModel} from "../Text"

export interface State {
    search: SearchState
    request: RequestDuckState
    textAlignment: TextAlignment
    viewAllModal: ViewAllModalDuckState
    features: FeaturesDuckState
    seoFilters: SeoFiltersDuckState
    categoryQuickLinks: CategoryQuickLinksState
    tabbedFilters: TabbedFilterDuckState
    text: TextModel
}

export default State
