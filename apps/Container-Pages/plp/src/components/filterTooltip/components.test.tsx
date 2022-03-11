import React from "react"
import {render} from "@testing-library/react"
import {
    Tooltip,
    TooltipArrowShadow,
    TooltipArrowNoShadow,
    TooltipWrapper,
    TooltipTitleWrapper,
    TooltipTitle,
    TooltipBody,
    CloseIconButton,
    CloseIcon,
    FacetTooltip,
} from "./components"

describe("Filter Tooltip Components", () => {
    describe("Given a TooltipArrowShadow", () => {
        it("When LTR it should match the snapshot correctly", () => {
            const {asFragment} = render(<TooltipArrowShadow theme={{direction: "ltr"} as any} />)

            expect(asFragment()).toMatchSnapshot()
        })

        it("When RTL it should match the snapshot correctly", () => {
            const {asFragment} = render(<TooltipArrowShadow theme={{direction: "rtl"} as any} />)

            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("Given a TooltipArrowNoShadow", () => {
        it("When LTR it should match the snapshot correctly", () => {
            const {asFragment} = render(<TooltipArrowNoShadow theme={{direction: "ltr"} as any} />)

            expect(asFragment()).toMatchSnapshot()
        })

        it("When RTL it should match the snapshot correctly", () => {
            const {asFragment} = render(<TooltipArrowNoShadow theme={{direction: "rtl"} as any} />)

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a Tooltip", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(<Tooltip />)

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a TooltipWrapper", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(<TooltipWrapper />)

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a TooltipTitleWrapper", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(<TooltipTitleWrapper />)

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a TooltipTitle", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(<TooltipTitle />)

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a TooltipBody", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(<TooltipBody />)

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a CloseIconButton", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(<CloseIconButton />)

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a CloseIcon", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(<CloseIcon />)

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a FacetTooltip", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(<FacetTooltip />)

            expect(asFragment()).toMatchSnapshot()
        })
    })
})
