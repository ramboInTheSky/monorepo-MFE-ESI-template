import {RequestDuckState} from "./request"
import {RecentsDuckState} from "./recents"
import {HeaderDuckState} from "./headerdata"
import {ShoppingBagDuckState} from "./shoppingbag"
import {UserDuckState} from "./user"
import {LanguageDuckState} from "./languages"
import {AutoCompleteDuckState} from "./autocomplete"
import {SearchDuckState} from "./search"
import {FavouritesDuckState} from "./favourites"
import {FeaturesDuckState} from "./feature-switch"
import type {CountrySelectorDuckState} from "./country-selector"
import { TextDuckState } from "./text"
import {SettingsModel} from './settings'

interface State {
    user: UserDuckState
    request: RequestDuckState
    languages: LanguageDuckState
    recents: RecentsDuckState
    shoppingBag: ShoppingBagDuckState
    search: SearchDuckState
    data: HeaderDuckState
    autocomplete: AutoCompleteDuckState
    favourites: FavouritesDuckState
    features: FeaturesDuckState
    countrySelector: CountrySelectorDuckState
    text: TextDuckState
    textAlignment: string
    template: string
    settings: SettingsModel

}

export default State
