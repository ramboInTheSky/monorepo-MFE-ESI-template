import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import {mockColors} from "@monorepo/themes"
import {State} from "../src/ducks"
import PrimaryNavData from "./apiAppData.json"
import SecondaryNavData from "./apiSecondaryNavData"
import {SettingsModel} from "../src/ducks/settings"
import {MissionViewportDimensions} from "../src/models/dimensions"
import {CompositionSettingsDuckState} from "../src/ducks/compositionSettings"

export const mockDimensions = {
    sm: {
        width: "5.375rem",
        height: "2.75rem",
        padding: "0.625rem 0",
        borderRadius: "0",
        border: "0",
        order: "1",
        justifyContent: "center",
    },
    xs: {
        width: "5.375rem",
        height: "2.75rem",
        padding: "0.625rem 0",
        borderRadius: "0",
        border: "0",
        order: "1",
        justifyContent: "center",
    },
    md: {
        width: "5.375rem",
        height: "2.75rem",
        padding: "0.625rem 0",
        borderRadius: "0",
        border: "0",
        order: "1",
        justifyContent: "center",
    },
    lg: {
        width: "5.375rem",
        height: "2.75rem",
        padding: "0.625rem 0",
        borderRadius: "0",
        border: "0",
        order: "1",
        justifyContent: "center",
    },
    xl: {
        width: "5.375rem",
        height: "2.75rem",
        padding: "0.625rem 0",
        borderRadius: "0",
        border: "0",
        order: "1",
        justifyContent: "center",
    },
}

const missionsMockDimensions: MissionViewportDimensions = {
    Container: mockDimensions,
    Item: mockDimensions,
}

export const mockRealmDimensions = {
    UpperHeader: mockDimensions,
    PrimaryNav: mockDimensions,
    SecondaryNav: mockDimensions,
    SnailItem: mockDimensions,
    Missions: missionsMockDimensions,
}

export const mockLanguages = {
    currentLanguageText: "English",
    altLanguageName: "ar",
    altLanguageUrl: "/ar",
    currentLanguageName: "en",
    direction: "ltr",
    siteUrl: "http://amido.com",
}

export const mockTheme = {
    dimensions: mockRealmDimensions,
    colours: mockColors,
}

export const mockAccordionActivity = {}
export const mockTabsActivity = {
    men: 0,
}

export const mockMissions = {
    title: "sample-missions-title",
    categoryLink: {title: "categoryLinkTitle", target: "/categoryLinkTarget"},
    items: [],
    noOfColumns: 6,
}

export const mockPrimarynav = {
    activeDepartment: "men",
    active: false,
    activeDepartmentIndex: -1,
    items: PrimaryNavData.items,
    isInPrimaryNav: false,
    config: {
        version: "v1.0.0",
        country: "mx",
    },
}

export const mockBanner = {
    imageUrl: "/sampleimageurl",
    target: "/sampletarget",
}

export const mockText = {
    arrowIconUrlAltText: "Menu expand icon",
    bannerAltText: "Banner image",
    chevronIconAltText: "Chevron icon",
    drawerIconAltText: "Drawer close icon",
}

export const mockSecondarynav = {
    departmentIds: ["men"],
    catalogues: {
        men: SecondaryNavData,
    },
    isPending: false,
    isInSecondaryNav: false,
    isImagePlaceholderEnabled: false,
    config: {
        version: "v1.0.0",
        country: "mx",
    },
}

export const mockSettingsModel: SettingsModel = {
    template: "default",
}

export const mockCompositionSettings: CompositionSettingsDuckState = {
    showSecondaryNavArrow: false,
}

export const mockState: State = {
    primarynav: mockPrimarynav as any,
    secondarynav: mockSecondarynav,
    accordionActivity: mockAccordionActivity,
    tabsActivity: mockTabsActivity,
    settings: mockSettingsModel,
    request: {
        headers: {"x-monorepo-territory": "gb"},
        url: "/",
        siteUrl: "",
    },
    textAlignment: "ltr",
    text: mockText,
    compositionSettings: mockCompositionSettings,
}

const mockConfigureStore = configureMockStore([thunk])
const mockStore = mockConfigureStore(mockState)

export default mockStore
