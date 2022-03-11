import React from "react"
import {render, cleanup, fireEvent} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {ColourChips} from "."
import * as ImagePreloader from "../../hooks/usePreloadImages"
import text from "../../../__mocks__/default-text.json"

jest.mock("../colourchip", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: ({itemNumber}) => <div>{itemNumber} - TEST CHIP</div>,
}))

const mockColourChips18 = [
    {
        itemNumber: "1",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "red",
        id: "001",
        title: "Red",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
    {
        itemNumber: "2",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "blue",
        id: "002",
        title: "Blue",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
    {
        itemNumber: "3",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "red",
        id: "003",
        title: "Red",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
    {
        itemNumber: "4",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "blue",
        id: "004",
        title: "Blue",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
    {
        itemNumber: "5",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "red",
        id: "005",
        title: "Red",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
    {
        itemNumber: "6",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "blue",
        id: "006",
        title: "Blue",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
    {
        itemNumber: "7",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "red",
        id: "007",
        title: "Red",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
    {
        itemNumber: "8",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "blue",
        id: "008",
        title: "Blue",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
    {
        itemNumber: "9",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "red",
        id: "009",
        title: "Red",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
    {
        itemNumber: "10",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "blue",
        id: "010",
        title: "Blue",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
    {
        itemNumber: "11",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "red",
        id: "011",
        title: "Red",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
    {
        itemNumber: "12",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "blue",
        id: "012",
        title: "Blue",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
    {
        itemNumber: "13",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "red",
        id: "013",
        title: "Red",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
    {
        itemNumber: "14",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "blue",
        id: "014",
        title: "Blue",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
    {
        itemNumber: "15",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "red",
        id: "015",
        title: "Red",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
    {
        itemNumber: "16",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "blue",
        id: "016",
        title: "Blue",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
    {
        itemNumber: "17",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "red",
        id: "017",
        title: "Red",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
    {
        itemNumber: "18",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "red",
        id: "018",
        title: "Red",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
]
const mockColourChips19 = [
    ...mockColourChips18,
    {
        itemNumber: "19",
        colourChipUrl: "www.test.com",
        linkUrl: "link url",
        isSelected: true,
        colour: "red",
        id: "019",
        title: "Red",
        price: "£123",
        currencyCode: "GBP",
        altText: "colour - title",
        department: "menswear",
    },
]
const mockImageBuilder = jest.fn(() => "value")

beforeAll(() => {
    jest.spyOn(ImagePreloader, "usePreloadImages")
})

describe("ColourChips: ", () => {
    afterEach(() => {
        cleanup()
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ColourChips colourchips={mockColourChips18} colourWayImageUrlBuilder={mockImageBuilder} text={text} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should render 18 colourchips at first load, it should match the snapshot and have the correct min-heigh", () => {
        const {asFragment, getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <ColourChips colourchips={mockColourChips19} colourWayImageUrlBuilder={mockImageBuilder} text={text} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()

        const colourChipCollapse = getByTestId("product_summary_colourchips_collapse_wrapper")
        expect(colourChipCollapse.style.minHeight).toBe("48px")
    })
    it("should render 19 colourchips when view more colours is clicked, it should match the snapshot and have the correct min-height", () => {
        const mockPreloader = jest.fn()
        ;(ImagePreloader.usePreloadImages as jest.Mock).mockReturnValue(mockPreloader)
        const {asFragment, getByText} = render(
            <ThemeProvider theme={mockTheme}>
                <ColourChips colourchips={mockColourChips19} colourWayImageUrlBuilder={mockImageBuilder} text={text} />
            </ThemeProvider>,
        )
        fireEvent.click(getByText(/View more colours/))
        expect(asFragment()).toMatchSnapshot()
        expect(mockPreloader).toHaveBeenCalledWith(["value"])

        expect(getByText(/View less colours/)).toBeInTheDocument()
    })

    describe("When there are no colourchips", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <ColourChips colourchips={[]} colourWayImageUrlBuilder={mockImageBuilder} text={text} />
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
