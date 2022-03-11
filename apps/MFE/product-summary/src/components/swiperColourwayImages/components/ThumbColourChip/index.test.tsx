import React from "react"
import {fireEvent, render} from "@testing-library/react"

import {ThumbColourChip} from "."

jest.mock("../../../../hooks/useLazyLoadImage", () => ({
    useColourChipsLazyLoadImage: () => ({
        imageProps: {
            alt: "test-image-url",
            className: "c1 lazyload",
            "data-src": "test-image-url",
            src: "spiderman/Common/Items/Default/Default/ItemImages/AltItemSwatch/21x21/greySquarePlaceholder.jpg",
        },
    }),
}))

describe("Given a ThumbColourChip", () => {
    const mockSetSelectedColourWay = jest.fn()

    it("should render the components to match the snapshot", () => {
        const {asFragment} = render(
            <ThumbColourChip
                altText="altText"
                id="test-id"
                imageUrl="test-image-url"
                setSelectedColourWay={mockSetSelectedColourWay}
            />,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    describe("When clicked", () => {
        it("should set selected colourway", () => {
            const {getByTestId} = render(
                <ThumbColourChip
                    altText="altText"
                    id="test-id"
                    imageUrl="test-image-url"
                    setSelectedColourWay={mockSetSelectedColourWay}
                />,
            )

            fireEvent.click(getByTestId("product_summary_thumb_colourchip_test-id"))

            expect(mockSetSelectedColourWay).toHaveBeenCalledWith("test-id")
        })
    })
})
