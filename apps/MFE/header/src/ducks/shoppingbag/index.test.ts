import {ShoppingBag, ChargesAndIncentive} from "models/shoppingbag"
import reducer, {updateBag, SET_BAG, addEVoucherToBag} from "."

const mockStoreGetState = jest.fn(() => ({
    request: {
        headers: {
            success: true,
            "x-monorepo-realm": "amido",
            "x-monorepo-territory": "nl",
            "x-monorepo-language": "en",
        },
        siteUrl: "http://localhost:3004",
    },
}))

const mockStoreGetStateEVoucher = jest.fn(() => ({
    request: {
        headers: {
            success: true,
            "x-monorepo-realm": "amido",
            "x-monorepo-territory": "nl",
            "x-monorepo-language": "en",
        },
        siteUrl: "http://localhost:3004",
    },
    shoppingBag: {
        itemCount: 1,
        bag: {
            Items: [
                {Description: "Test Title2", SizeDescription: "M", Quantity: 5, Price: 7.99, StatusMessage: "In Stock"},
            ],
        },
        loading: false,
    },
}))

const mockStoreGetStateEVoucherWithEmptyArray = jest.fn(() => ({
    request: {
        headers: {
            success: true,
            "x-monorepo-realm": "amido",
            "x-monorepo-territory": "nl",
            "x-monorepo-language": "en",
        },
        siteUrl: "http://localhost:3004",
    },
    shoppingBag: {
        itemCount: 1,
        bag: {
            Items: [],
        },
        loading: false,
    },
}))

const mockStore = {
    getState: mockStoreGetState,
}

const mockStoreEVoucher = {
    getState: mockStoreGetStateEVoucher,
}

const mockStoreEVoucherWithEmptyArray = {
    getState: mockStoreGetStateEVoucherWithEmptyArray,
}

const mockDispatch = jest.fn()
describe("Given a Shopping Bag Duck", () => {
    const bag = {
        ShoppingBag: {
            Items: [
                {Description: "Test Title", SizeDescription: "L", Quantity: 5, Price: 7.99, StatusMessage: "In Stock"},
            ],
            ItemCount: 1,
            ChargesAndIncentives: [
                {
                    AdditionalAmount: -10.0,
                    AdditionalCode: "UKC01",
                    OfferTypeDescription: "Welcome Offer",
                    OfferShortDescription: "Welcome Offer",
                    Type: "PRO",
                    MinimumOrderValue: 15.0,
                    MaximumOrderValue: 0.0,
                    AdditionalAmountFormatted: "-£10.00",
                } as ChargesAndIncentive,
            ],
        },
    }
    const bagWithBagObject = {
        Bag: {
            ItemCount: 1,
            Items: [
                {Description: "Test Title2", SizeDescription: "M", Quantity: 5, Price: 7.99, StatusMessage: "In Stock"},
            ],
        },
    }
    describe("When updateBag is called", () => {
        const {Items: items} = bag.ShoppingBag
        it("When success data, it should call dispatch", () => {
            updateBag({
                success: true,
                data: {...bag},
            } as any)(mockDispatch, mockStore.getState)
            expect(mockDispatch).toHaveBeenCalledWith({
                payload: {bag: {...bag.ShoppingBag}, loading: false, itemCount: items.length},
                type: SET_BAG,
            })
        })

        it("When success data and no incentives, it should call dispatch", () => {
            const mockBag = {...bag}
            mockBag.ShoppingBag.ChargesAndIncentives = []
            updateBag({
                success: true,
                data: {...bag},
            } as any)(mockDispatch, mockStore.getState)
            expect(mockDispatch).toHaveBeenCalledWith({
                payload: {bag: {...mockBag.ShoppingBag}, loading: false, itemCount: items.length},
                type: SET_BAG,
            })
        })

        it("When not success data, it should call dispatch", () => {
            updateBag({
                success: false,
                data: {...bag},
            } as any)(mockDispatch, mockStore.getState)
            expect(mockDispatch).toHaveBeenCalledWith({
                payload: {itemCount: 0, loading: true, bag: {}},
                type: SET_BAG,
            })
        })
    })

    describe("When AddEVoucherToBag is called", () => {
        it("When success data, it should call dispatch with empty array", () => {
            addEVoucherToBag({
                success: true,
                data: {...bagWithBagObject},
            } as any)(mockDispatch, mockStoreEVoucherWithEmptyArray.getState)
            expect(mockDispatch).toHaveBeenCalledWith({
                type: SET_BAG,
                payload: {
                    bag: {
                        ChargesAndIncentives: [],
                        ItemCount: 1,
                        Items: [
                            {
                                Description: "Test Title",
                                Price: 7.99,
                                Quantity: 5,
                                SizeDescription: "L",
                                StatusMessage: "In Stock",
                                Url: "http://localhost:3004http://localhost:3004undefined",
                                itemImageUrl:
                                    "https://xcdn.amido.com/content/common/items/default/default/itemimages/altitembag/undefined.jpg",
                            },
                        ],
                    },
                    itemCount: 1,
                    loading: false,
                },
            })
        })
        it("When success data, it should call dispatch", () => {
            addEVoucherToBag({
                success: true,
                data: {...bagWithBagObject},
            } as any)(mockDispatch, mockStoreEVoucher.getState)
            expect(mockDispatch).toHaveBeenCalledWith({
                type: SET_BAG,
                payload: {
                    bag: {
                        ChargesAndIncentives: [],
                        ItemCount: 1,
                        Items: [
                            {
                                Description: "Test Title",
                                Price: 7.99,
                                Quantity: 5,
                                SizeDescription: "L",
                                StatusMessage: "In Stock",
                                Url: "http://localhost:3004http://localhost:3004undefined",
                                itemImageUrl:
                                    "https://xcdn.amido.com/content/common/items/default/default/itemimages/altitembag/undefined.jpg",
                            },
                        ],
                    },
                    itemCount: 1,
                    loading: false,
                },
            })
        })
        it("When success data with Bag object, it should call dispatch", () => {
            addEVoucherToBag({
                success: true,
                data: {...bagWithBagObject},
            } as any)(mockDispatch, mockStoreEVoucher.getState)
            expect(mockDispatch).toHaveBeenCalledWith({
                type: SET_BAG,
                payload: {
                    bag: {
                        ChargesAndIncentives: [],
                        ItemCount: 1,
                        Items: [
                            {
                                Description: "Test Title",
                                Price: 7.99,
                                Quantity: 5,
                                SizeDescription: "L",
                                StatusMessage: "In Stock",
                                Url: "http://localhost:3004http://localhost:3004undefined",
                                itemImageUrl:
                                    "https://xcdn.amido.com/content/common/items/default/default/itemimages/altitembag/undefined.jpg",
                            },
                        ],
                    },
                    itemCount: 1,
                    loading: false,
                },
            })
        })

        it("When not success data, it should call dispatch", () => {
            addEVoucherToBag({
                success: false,
                data: {...bag},
            } as any)(mockDispatch, mockStoreEVoucher.getState)
            expect(mockDispatch).toHaveBeenCalledWith({
                type: SET_BAG,
                payload: {itemCount: 0, bag: {}, loading: true},
            })
        })
    })

    describe("Given a reducer", () => {
        it("should correctly return the reduced state", () => {
            const initialState = {
                itemCount: 0,
                bag: {} as ShoppingBag,
                loading: false,
            }
            const mockAction = {
                type: SET_BAG as typeof SET_BAG,
                payload: {
                    itemCount: 123,
                    bag: {} as ShoppingBag,
                    loading: false,
                },
            }
            expect(reducer(initialState, mockAction)).toEqual({
                itemCount: 123,
                bag: {} as ShoppingBag,
                loading: false,
            })
        })
    })
})
