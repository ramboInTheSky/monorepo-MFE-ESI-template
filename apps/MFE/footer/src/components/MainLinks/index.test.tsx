import React from "react"
import {render} from "@testing-library/react"

import apiFooterData from "../../../__mocks__/apiFooterData"
import {SupportedRegionTypes} from "../../models/regions"
import MainLinks from "."

const mainLinksData = apiFooterData.regions.find(region => region.type === SupportedRegionTypes.MainLinks)

jest.mock("../Accordion", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => {
        return <div>Accordion component</div>
    },
}))
jest.mock("./MainLinksList", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => {
        return <div>MainLinkList component</div>
    },
}))

describe("Components - MainLinks: ", () => {
    it("should match the snapshot template for desktop version", () => {
        const {asFragment} = render(<MainLinks region={mainLinksData} width="lg" />)

        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot template for tablet/mobile version", () => {
        const {asFragment} = render(<MainLinks region={mainLinksData} width="sm" />)
        expect(asFragment()).toMatchSnapshot()
    })

    describe("When one of the subregion does not have a title: ", () => {
        const newProps = {
            ...mainLinksData,
            subRegions: [
                {
                    title: "",
                    accessibilityTitle: "Help",
                    elements: [
                        {
                            type: "Link",
                            url: "https://www.amido.com/help",
                            openInNewWindow: true,
                            name: "Help",
                            icon: null,
                            text: "View Help Topics",
                            accessibilityText: "View Help Topics",
                            tooltip: "View Help Topics",
                            accessibilityTooltip: "View Help Topics",
                            description: null,
                            accessibilityDescription: null,
                        },
                    ],
                },
                {
                    title: "Privacy & Legal",
                    accessibilityTitle: "Privacy and Legal",
                    elements: [
                        {
                            type: "Link",
                            url: "/privacy",
                            openInNewWindow: false,
                            name: "Cookies & Privacy Policy",
                            icon: null,
                            text: "Cookies & Privacy Policy",
                            accessibilityText: "Cookies and Privacy Policy",
                            tooltip: "Cookies & Privacy Policy",
                            accessibilityTooltip: "Cookies and Privacy Policy",
                            description: null,
                            accessibilityDescription: null,
                        },
                    ],
                },
            ],
        }
        it("should only show Privacy & Legal and not show Help sub Region", () => {
            const {asFragment, getByTestId, queryByTestId} = render(<MainLinks region={newProps} width="lg" />)

            const privacyAndLegalTestId = "footer-main-links-title-privacy-&-legal"
            const helpTestId = "footer-main-links-title-help"

            expect(asFragment()).toMatchSnapshot()
            expect(queryByTestId(helpTestId)).toBeNull()

            expect(getByTestId(privacyAndLegalTestId)).toBeInTheDocument()
            expect(getByTestId(privacyAndLegalTestId)).toHaveTextContent("Privacy & Legal")
        })
    })
})
