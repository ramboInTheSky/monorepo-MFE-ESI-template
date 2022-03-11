import configureMockStore from "redux-mock-store"
import {State} from "../src/ducks"

export const mockText = {
    defaultCopyrightText: `Amido Retail Ltd. All rights reserved.`,
}

export const mockState: State = {
    user: {accountFirstName: "", loggedIn: false},
    request: {headers: {}, url: "/", isInternationalCountry: false},
    textAlignment: "ltr",
    data: {
        id: "",
        name: "",
        realm: "",
        territory: "",
        language: "",
        regions: [
            {
                type: "",
                title: "",
                accessibilityTitle: "",
                subRegions: [
                    {
                        title: "",
                        accessibilityTitle: "",
                        elements: [
                            {
                                url: "",
                                openInNewWindow: false,
                                name: "",
                                type: "",
                                icon: "",
                                text: "",
                                accessibilityText: "",
                                tooltip: "",
                                accessibilityTooltip: "",
                                description: "",
                                accessibilityDescription: "",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    languages: {
        currentLanguageText: "English",
        altLanguageName: "ar",
        altLanguageUrl: "/ar",
        currentLanguageName: "en",
        direction: "ltr",
        siteUrl: "http://amido.com",
    },
    text: mockText,
    settings: {variant: "default"},
}

const mockConfigureStore = configureMockStore()
const mockStore = mockConfigureStore(mockState)

export default mockStore
