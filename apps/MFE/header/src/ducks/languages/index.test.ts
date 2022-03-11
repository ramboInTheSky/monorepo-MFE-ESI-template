import {Store} from "redux"
import reducer, {SET_LANGUAGE, updateLanguage} from "."

const mockStoreDispatch = jest.fn()
const store = {dispatch: mockStoreDispatch} as unknown as Store

const initialState = {
    currentLanguageText: "",
    altLanguageName: "",
    altLanguageUrl: "",
    currentLanguageName: "",
    direction: "ltr",
    siteUrl: "",
}
const mockLanguage = {
    currentLanguageText: "English",
    altLanguageName: "ar",
    altLanguageUrl: "/ar",
    currentLanguageName: "en",
    direction: "ltr",
    siteUrl: "http://amido.sa/en",
}

describe("reducers: user", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "test" as any,
                    languageSelectorData: {
                        currentLanguageText: "",
                        altLanguageName: "",
                        altLanguageUrl: "",
                        currentLanguageName: "",
                        direction: "ltr",
                        siteUrl: "",
                    },
                }),
            ).toEqual({
                ...initialState,
            })
        })
    })

    describe("When called with an action to ignore", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(initialState, {
                    type: "TEST" as any,
                    languageSelectorData: {
                        currentLanguageText: "",
                        altLanguageName: "",
                        altLanguageUrl: "",
                        currentLanguageName: "",
                        direction: "",
                        siteUrl: "",
                    },
                }),
            ).toEqual({
                ...initialState,
            })
        })
    })

    describe("When called with SET_LANGUAGE", () => {
        const expectedState = {
            currentLanguageText: "English",
            altLanguageName: "ar",
            altLanguageUrl: "/ar",
            currentLanguageName: "en",
            direction: "ltr",
            siteUrl: "http://amido.sa/en",
        }
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_LANGUAGE,
                    languageSelectorData: {
                        currentLanguageText: "English",
                        altLanguageName: "ar",
                        altLanguageUrl: "/ar",
                        currentLanguageName: "en",
                        direction: "ltr",
                        siteUrl: "http://amido.sa/en",
                    },
                }),
            ).toEqual({
                ...expectedState,
            })
        })
    })
})

describe("Store: Helpers: updateUserStatus() - ", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    describe("When a user name is provided", () => {
        it("should set the redux store as logged in", () => {
            updateLanguage(store, mockLanguage)
            expect(mockStoreDispatch).toHaveBeenCalled()
            expect(mockStoreDispatch).toHaveBeenCalledWith({
                type: SET_LANGUAGE,
                languageSelectorData: {
                    currentLanguageText: "English",
                    altLanguageName: "ar",
                    altLanguageUrl: "/ar",
                    currentLanguageName: "en",
                    direction: "ltr",
                    siteUrl: "http://amido.sa/en",
                },
            })
        })
    })
})
