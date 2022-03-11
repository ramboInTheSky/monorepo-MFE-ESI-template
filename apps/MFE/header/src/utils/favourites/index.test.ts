import {shouldUseSessionStorage, setCacheVersion, setSessionStorageHasFavouriteItems, getFormattedItemNumber} from "."

describe("When shouldUseSessionStorage", () => {
    it("shouldUseSessionStorage should return true", () => {
        const useSessionStorage = shouldUseSessionStorage()
        expect(useSessionStorage).toBe(true)
    })
    it("shouldUseSessionStorage should return false if error", () => {
        const mockSessionStorage = {
            setItem: jest.fn(() => {
                throw new Error()
            }),
        } as unknown as Storage
        Object.defineProperty(window, "sessionStorage", mockSessionStorage)
        const useSessionStorage = shouldUseSessionStorage()
        expect(useSessionStorage).toBe(false)
    })

    afterAll(() => {
        jest.clearAllMocks()
        window.sessionStorage.clear()
    })
})

describe("When setCacheVersion is called", () => {
    it("setCacheVersion should return string", () => {
        expect(setCacheVersion()).toBeDefined()
    })
    it("setCacheVersion should set favouriteCacheVersion in localStorage when favouriteCacheVersion is null", () => {
        setCacheVersion()
        expect(localStorage.getItem("favouriteCacheVersion")).toBeDefined()
    })
    it("setCacheVersion should return favouriteCacheVersion from localStorage when it's set", () => {
        localStorage.setItem("favouriteCacheVersion", "test 1")
        setCacheVersion()
        expect(localStorage.getItem("favouriteCacheVersion")).toBe("test 1")
    })
})

describe("When setCacheVersion is called with parameter", () => {
    it("setCacheVersion should set favouriteCacheVersion when parameter is true", () => {
        localStorage.setItem("favouriteCacheVersion", "test 2")
        setCacheVersion(true)
        expect(localStorage.getItem("favouriteCacheVersion")).not.toBe("test 2")
    })

    it("setCacheVersion should set favouriteCacheVersion when parameter is false", () => {
        setCacheVersion(false)
        expect(localStorage.getItem("favouriteCacheVersion")).toBeDefined()
    })
})

describe("When setSessionStorageHasFavouriteItems is called", () => {
    beforeEach(() => {
        const sessionStorageMock = (() => {
            const store = {}
            return {
                getItem(key) {
                    return store[key] || null
                },
                setItem(key, value) {
                    store[key] = value.toString()
                },
            }
        })()

        Object.defineProperty(window, "sessionStorage", {
            value: sessionStorageMock,
        })
        jest.restoreAllMocks()
    })
    it("AmidoFavourites:HasFavouriteItems should be set to be true", () => {
        setSessionStorageHasFavouriteItems({ShoppingListItems: [{test: "test"}]})
        expect(window.sessionStorage.getItem("AmidoFavourites:HasFavouriteItems")).toBe("true")
    })

    it("AmidoFavourites:HasFavouriteItems should be set to be false", () => {
        setSessionStorageHasFavouriteItems({ShoppingListItems: []})
        expect(window.sessionStorage.getItem("AmidoFavourites:HasFavouriteItems")).toBe("false")
    })
})

describe("When getFormattedItemNumber is called", () => {
    const itemNumber = "123456"
    const itemNumberFormatted = "123-456"

    it("returns correct item number when there is dash", () => {
        const result = getFormattedItemNumber(itemNumberFormatted)
        expect(result).toBe(itemNumberFormatted)
    })

    it("returns correct item number when there is no dash", () => {
        const result = getFormattedItemNumber(itemNumber)
        expect(result).toBe(itemNumberFormatted)
    })
})
