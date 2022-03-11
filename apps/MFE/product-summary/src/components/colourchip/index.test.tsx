import React from "react"
import {render, cleanup, fireEvent} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {ColourChip} from "."
import * as TouchDeviceUtil from "../../utils/is-touch-device"

function mockIsTouchDeviceReturnValue(value: boolean) {
    jest.spyOn(TouchDeviceUtil, "isTouchDevice").mockReturnValue(value)
}

const mockSetMatchingColourWay = jest.fn()

describe("ColourChip: ", () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    afterAll(() => {
        cleanup()
    })
    it("should match the snapshot when it is not selected ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ColourChip
                    src="test_linkUrl"
                    linkUrl="test_title"
                    isSelected={false}
                    setMatchingColourWay={mockSetMatchingColourWay}
                    itemNumber="testItemNumber"
                    id="000"
                    title="Texture Maxi Dress"
                    price="£123"
                    currencyCode="GBP"
                    colour="white"
                    altText="some alt text"
                    department="menswear"
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot when it is selected ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ColourChip
                    src="test_linkUrl"
                    linkUrl="test_title"
                    isSelected
                    setMatchingColourWay={mockSetMatchingColourWay}
                    itemNumber="testItemNumber"
                    id="000"
                    title="Texture Maxi Dress"
                    price="£123"
                    currencyCode="GBP"
                    colour="white"
                    altText="some alt text"
                    department="menswear"
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    describe("When is touch device", () => {
        it("should match the snapshot ", () => {
            mockIsTouchDeviceReturnValue(true)

            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <ColourChip
                        src="test_linkUrl"
                        linkUrl="test_title"
                        isSelected={false}
                        setMatchingColourWay={mockSetMatchingColourWay}
                        itemNumber="testItemNumber"
                        id="000"
                        title="Texture Maxi Dress"
                        price="£123"
                        currencyCode="GBP"
                        colour="white"
                        altText="some alt text"
                        department="menswear"
                    />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When is touch device and colourway chip is clicked", () => {
        it("should trigger 'setMatchingColourWay' when 'isSelected' is false", () => {
            mockIsTouchDeviceReturnValue(true)

            const {getByTestId} = render(
                <ThemeProvider theme={mockTheme}>
                    <ColourChip
                        src="test_linkUrl"
                        linkUrl="test_title"
                        isSelected={false}
                        setMatchingColourWay={mockSetMatchingColourWay}
                        itemNumber="testItemNumber"
                        id="000"
                        title="Texture Maxi Dress"
                        price="£123"
                        currencyCode="GBP"
                        colour="white"
                        altText="some alt text"
                        department="menswear"
                    />
                </ThemeProvider>,
            )

            fireEvent.click(getByTestId("product_summary_colourchip_testitemnumber"))

            expect(mockSetMatchingColourWay).toHaveBeenCalledWith()
        })
    })

    describe("When is touch device and colourway chip is hovered using a mouse", () => {
        it("should trigger 'setMatchingColourWay' when 'isSelected' is false", () => {
            mockIsTouchDeviceReturnValue(true)

            const {getByTestId} = render(
                <ThemeProvider theme={mockTheme}>
                    <ColourChip
                        src="test_linkUrl"
                        linkUrl="test_title"
                        setMatchingColourWay={mockSetMatchingColourWay}
                        itemNumber="testItemNumber"
                        isSelected={false}
                        id="000"
                        title="Texture Maxi Dress"
                        price="£123"
                        currencyCode="GBP"
                        colour="white"
                        altText="some alt text"
                        department="menswear"
                    />
                </ThemeProvider>,
            )

            fireEvent.mouseEnter(getByTestId("product_summary_colourchip_testitemnumber"))

            expect(mockSetMatchingColourWay).toBeCalled()
        })
    })

    describe("When is not touch device and colourway chip is clicked", () => {
        it("should not trigger 'setMatchingColourWay' when 'isSelected' is true", () => {
            const {getByTestId} = render(
                <ThemeProvider theme={mockTheme}>
                    <ColourChip
                        src="test_linkUrl"
                        linkUrl="test_title"
                        setMatchingColourWay={mockSetMatchingColourWay}
                        itemNumber="testItemNumber"
                        isSelected
                        id="000"
                        title="Texture Maxi Dress"
                        price="£123"
                        currencyCode="GBP"
                        colour="white"
                        altText="some alt text"
                        department="menswear"
                    />
                </ThemeProvider>,
            )

            fireEvent.click(getByTestId("product_summary_colourchip_testitemnumber"))

            expect(mockSetMatchingColourWay).not.toHaveBeenCalledWith()
        })

        it("should trigger 'setMatchingColourWay' when 'isSelected' is false", () => {
            const {getByTestId} = render(
                <ThemeProvider theme={mockTheme}>
                    <ColourChip
                        src="test_linkUrl"
                        linkUrl="test_title"
                        setMatchingColourWay={mockSetMatchingColourWay}
                        itemNumber="testItemNumber"
                        isSelected={false}
                        id="000"
                        title="Texture Maxi Dress"
                        price="£123"
                        currencyCode="GBP"
                        colour="white"
                        altText="some alt text"
                        department="menswear"
                    />
                </ThemeProvider>,
            )

            fireEvent.mouseEnter(getByTestId("product_summary_colourchip_testitemnumber"))

            expect(mockSetMatchingColourWay).toBeCalled()
        })
    })
})

describe("When is not touch device and colourway chip is tabbed to using keyboard", () => {
    it("should trigger 'setMatchingColourWay' when 'isSelected' is false", () => {
        const {getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <ColourChip
                    src="test_linkUrl"
                    linkUrl="test_title"
                    setMatchingColourWay={mockSetMatchingColourWay}
                    itemNumber="testItemNumber"
                    isSelected={false}
                    id="000"
                    title="Texture Maxi Dress"
                    price="£123"
                    currencyCode="GBP"
                    colour="white"
                    altText="some alt text"
                    department="menswear"
                />
            </ThemeProvider>,
        )

        fireEvent.focus(getByTestId("product_summary_colourchip_testitemnumber"))

        expect(mockSetMatchingColourWay).toBeCalled()
    })
})
