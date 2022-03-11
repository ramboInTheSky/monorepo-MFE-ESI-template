import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {
    Hidden,
    Container,
    Title,
    List,
    Accordion,
    AccordionPanelDetails,
    AccordionPanelSummary,
    ImagePlaceholder,
} from "./component"
import {mockTheme} from "../../../__mocks__/mockStore"

describe("CatalogueList component: ", () => {
    describe("Container ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<Container />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("Title ", () => {
        it("should match the snapshot ", () => {
            const props = {
                linkColour: "#fff",
                fontFamily: "",
                fontWeight: "",
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Title {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot if isFirstElement is true", () => {
            const props = {
                linkColour: "#fff",
                fontFamily: "",
                fontWeight: "",
                isFirstElement: true,
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Title {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("List ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<List />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("Accordion ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Accordion>
                        <>fake</>
                    </Accordion>
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("AccordionPanelDeatails ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<AccordionPanelDetails />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("AccordionPanelSummary ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <AccordionPanelSummary />)
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("Hidden ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<Hidden />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("ImagePlaceholder no icon", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<ImagePlaceholder />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("ImagePlaceholder with icon", () => {
        it("should match the snapshot ", () => {
            const icon = {url: "https://some.co.uk/nice-image.png"}
            const {asFragment} = render(<ImagePlaceholder {...icon} />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
