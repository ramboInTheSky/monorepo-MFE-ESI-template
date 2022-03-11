import {getFavouriteIconPath, isFavouriteProduct, setFavoritesCallback, getNextFavouritesData, shoppingListItemsToFavouritedColourways} from "."
import {FavouriteState} from "../../models/Favourites"

describe("Utils: favourites", () => {
    describe("Utils: getFavouriteIconPath", () => {
        it("should match the path when active", () => {
            expect(getFavouriteIconPath(FavouriteState.Active)).toMatchSnapshot()
        })
        it("should match the path when inactive", () => {
            expect(getFavouriteIconPath(FavouriteState.Inactive)).toMatchSnapshot()
        })
        it("should match the path when loading", () => {
            expect(getFavouriteIconPath(FavouriteState.Loading)).toMatchSnapshot()
        })
    })

    describe("Utils: isFavouriteProduct", () => {
        const data = [{ItemNumber: "111-222"}]

        it("should return true for the favourite product match", () => {
            expect(isFavouriteProduct(data, "111222")).toEqual(true)
        })
        
        it("should return false for the favourite product mismatch", () => {
            expect(isFavouriteProduct(data, "111333")).toEqual(false)
        })
    })

    describe("Utils: setFavoritesCallback", () => {
        const data = {
            success: true,
            data: {
                ShoppingListItems: [{ItemNumber: "111-222"}]
            },
            status: 1,
            textStatus: "",
        }

        afterEach(() => {
            jest.resetAllMocks()
        })

        it("should call setFavouritedColourways successfully with favourited product IDs", () => {
            const setFavouritedColourwaysMock = jest.fn()

            setFavoritesCallback(data, setFavouritedColourwaysMock)
            expect(setFavouritedColourwaysMock).toHaveBeenCalledWith(["111222"])
        })

       

        it("should not call setFavouritedColourways for failed status", () => {
            const dataWithFailedStatus = {
                success: false,
                data: {
                    ShoppingListItems: [{ItemNumber: "111-222"}]
                },
                status: 1,
                textStatus: "",
            }

            const setFavouritedColourwaysMock = jest.fn()

            setFavoritesCallback(dataWithFailedStatus,  setFavouritedColourwaysMock)
            expect(setFavouritedColourwaysMock).not.toHaveBeenCalled()
        })

        it("should not call setFavouritedColourways if ShoppingListItems is not present", () => {
            const dataWithFailedStatus = {
                success: true,
                data: {
                    NoShoppingListItems: []
                },
                status: 1,
                textStatus: "",
            }

            const setFavouritedColourwaysMock = jest.fn()

            setFavoritesCallback(dataWithFailedStatus,  setFavouritedColourwaysMock)
            expect(setFavouritedColourwaysMock).not.toHaveBeenCalled()
        })
    })

    describe("Utils: getNextFavouritesData", () => {
        window.NextFavourites = {
            Data: {
                ShoppingLists: [
                    {
                        ItemNumber: "1234",
                    },
                ],
            },
        }

        it("should return correct data", () => {
            const data = getNextFavouritesData()

            expect(data.ShoppingLists[0].ItemNumber).toBe("1234")
        })

        it("should return undefined NextFavourites", () => {
            window.NextFavourites = undefined
            const data = getNextFavouritesData()

            expect(data).toBe(undefined)
        })
    })

    describe("Utils: shoppingListItemsToFavouritedColourways", () => {        
        it("should return correct data", () => {
            const data = shoppingListItemsToFavouritedColourways([{ItemNumber: "111-222"}])
            expect(data).toStrictEqual(["111222"])
        })
    })
})
