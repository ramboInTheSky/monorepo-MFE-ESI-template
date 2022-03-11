import {
    getListId,
    getFavouriteLoginPromptDisplayed,
    getHardLogoutPromptDisplayed,
    getIdentifiedUser,
    getSoftLoginFirstname,
    getShoppingLists,
} from "."

describe("Utils: getWindowNextFavourites", () => {
    const {NextFavourites} = window

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        delete window.NextFavourites
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        window.NextFavourites = {
            Data: {
                ShoppingLists: [
                    {
                        ListId: "1234",
                    },
                ],
                FavouriteLoginPromptDisplayed: true,
                HardLogoutPromptDisplayed: true,
                IdentifiedUser: true,
                SoftLoginFirstname: "dummyUser",
            },
        }
    })

    afterEach(() => {
        window.NextFavourites = NextFavourites
    })

    it("should return []", () => {
        window.NextFavourites = {
            Data: {},
        }
        expect(getShoppingLists()).toEqual([])
    })

    it("should return ListId 1234", () => {
        expect(getShoppingLists()).toEqual([
            {
                ListId: "1234",
            },
        ])
    })
    it("should return ListId1234", () => {
        expect(getListId()).toEqual("1234")
    })
    it("should return the default ListId - 0 ", () => {
        window.NextFavourites = null
        expect(getListId()).toEqual(0)
    })
    it("should return getFavouriteLoginPromptDisplayed true", () => {
        expect(getFavouriteLoginPromptDisplayed()).toEqual(true)
    })
    it("should return getHardLogoutPromptDisplayed true", () => {
        expect(getHardLogoutPromptDisplayed()).toEqual(true)
    })
    it("should return getIdentifiedUser true", () => {
        expect(getIdentifiedUser()).toEqual(true)
    })
    it("should return dummyUser", () => {
        expect(getSoftLoginFirstname()).toEqual("dummyUser")
    })
})
