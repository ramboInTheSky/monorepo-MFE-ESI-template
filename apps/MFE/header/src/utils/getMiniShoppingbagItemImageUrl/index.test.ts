import {
    sofaItem,
    sofaItemWithLinkedItem,
    personalisedItemWithoutImage,
    personalisedItemWithImage,
    customisedItemWithImage,
    customisedItemWithoutImage,
    customisedItemWithNoSofaAndNoPersonalisation,
    chairItem,
} from "../../../__mocks__/mockMiniShoppingBagItems"
import {getItemImageUrl, getImageUrl} from "."

describe("getItemImageUrl", () => {
    it("Should have correct image url for sofas item category", () => {
        expect(getItemImageUrl(sofaItem as any)).toEqual(
            "https://xcdn.amido.com/content/SofaContent/Item_AddToBag/512342_25.jpg",
        )
    })
    it("Should have correct image url for sofas item category with LinkedItem", () => {
        expect(getItemImageUrl(sofaItemWithLinkedItem as any)).toEqual(
            "https://xcdn.amido.com/content/SofaContent/Item_AddToBag/512342_25_179736.jpg",
        )
    })
    it("Should have correct image url for chair item", () => {
        expect(getItemImageUrl(chairItem as any)).toEqual(
            "https://xcdn.amido.com/content/common/items/default/default/itemimages/altitembag/351474.jpg",
        )
    })
    it("Should have correct image url for customised item with image url", () => {
        expect(getItemImageUrl(customisedItemWithImage as any)).toEqual(
            "https://d1k4nx4h9hlizo.cloudfront.net/m2m/images/NX-10066_PP6.jpg",
        )
    })
    it("Should have correct image url for customised item without image url", () => {
        expect(getItemImageUrl(customisedItemWithoutImage as any)).toEqual(
            "https://xcdn.amido.com/content/common/items/default/default/itemimages/altitembag/378766.jpg",
        )
    })
    it("Should have correct image url for personalised item with image url", () => {
        expect(getItemImageUrl(personalisedItemWithImage as any)).toEqual(
            "https://g3d-app.com/u/product-state/A6/52/9F/65/E9/5F/B5/2B/59/thumbnails/thumbnail.png",
        )
    })
    it("Should have correct image url for personalised item without image url", () => {
        expect(getItemImageUrl(personalisedItemWithoutImage as any)).toEqual(
            "https://xcdn.amido.com/content/common/items/default/default/itemimages/altitembag/466723.jpg",
        )
    })
    it("Should have correct image url for no personalised item without image url", () => {
        expect(getItemImageUrl(customisedItemWithNoSofaAndNoPersonalisation as any)).toEqual(
            "https://xcdn.amido.com/content/common/items/default/default/itemimages/altitembag/378766.jpg",
        )
    })
})

describe("getImageUrl", () => {
    it("Should return undefined if image does not exist in the parameters", () => {
        const fieldsWithoutImage = [
            {
                Field: "Width",
                Value: "3000mm",
            },
        ]
        expect(getImageUrl(fieldsWithoutImage)).toEqual(undefined)
    })
    it("Should return the image url if exists in the fields", () => {
        const fieldsWithImage = [
            {
                Field: "Width",
                Value: "3000mm",
            },
            {
                Field: "image",
                Value: "https://d1k4nx4h9hlizo.cloudfront.net/m2m/images/NX-10066_PP6.jpg",
            },
        ]
        expect(getImageUrl(fieldsWithImage)).toEqual(
            "https://d1k4nx4h9hlizo.cloudfront.net/m2m/images/NX-10066_PP6.jpg",
        )
    })
})
