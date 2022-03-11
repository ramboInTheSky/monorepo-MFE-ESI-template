import {TextModel} from "models/text"
import {FooterModel} from "../models/footerModel"
import {rootReducer, makeStore} from "."

const SET_USER = "SET_USER"

jest.mock("./user", () => () => ({
    accountFirstName: "string",
    loggedIn: true,
}))

const expectedInitialState = {
    user: {
        accountFirstName: "string",
        loggedIn: true,
    },
    request: {headers: {}, url: "/", isInternationalCountry: false},
    data: new FooterModel(),
    languages: {
        currentLanguageText: "",
        altLanguageName: "",
        altLanguageUrl: "",
        currentLanguageName: "",
        direction: "",
        siteUrl: "",
    },
    textAlignment: "ltr",
    text: {} as TextModel,
    settings: {variant: "default"},
}

describe("combined reducers", () => {
    it("generates the correct state", () => {
        const result = rootReducer(
            {
                user: {
                    accountFirstName: "string",
                    loggedIn: true,
                },
                request: {headers: {}, url: "/", isInternationalCountry: false},
                data: new FooterModel(),
                textAlignment: "ltr",
                languages: {
                    currentLanguageText: "",
                    altLanguageName: "",
                    altLanguageUrl: "",
                    currentLanguageName: "",
                    direction: "",
                    siteUrl: "",
                },
                text: {} as TextModel,
                settings: {variant: "default"},
            },
            {
                type: SET_USER,
                user: {accountFirstName: "spiderman", loggedIn: true},
            },
        )
        expect(result).toEqual(expectedInitialState)
    })

    describe("Store => makeStore ", () => {
        it("Genereates the store correctly with no errors", () => {
            const store = makeStore(expectedInitialState)
            const initialState = store.getState()
            expect(initialState).toEqual(expectedInitialState)
        })
    })
})
