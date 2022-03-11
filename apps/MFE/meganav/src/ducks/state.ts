import {RequestDuckState} from "./request"
import {PrimaryNavDuckState} from "./primary-nav"
import type {SecondaryNavDuckState} from "./secondary-nav"
import {AccordionActivityDuckState} from "./accordion-activity"
import {TabsActivityDuckState} from "./tabs-activity"
import {TextDuckState} from "./text"
import {SettingsModel} from "./settings"
import {CompositionSettingsDuckState} from "./compositionSettings"

interface State {
    request: RequestDuckState
    primarynav: PrimaryNavDuckState
    secondarynav: SecondaryNavDuckState
    accordionActivity: AccordionActivityDuckState
    tabsActivity: TabsActivityDuckState
    textAlignment: string
    text: TextDuckState
    settings: SettingsModel
    compositionSettings: CompositionSettingsDuckState
}

export default State
