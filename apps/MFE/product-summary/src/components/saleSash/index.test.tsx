import React from "react"
import {render} from "@testing-library/react"
import {SaleSash} from "."
import {SaleSashPosition} from "../../config/constants"

describe("Given a SaleSash Component", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(<SaleSash saleSashUrl="test.jpg" isOnSale saleSashPosition={SaleSashPosition.TL} />)
        expect(asFragment()).toMatchSnapshot()
    })

    it("When no sale sash url is provided, it should match the snapshot ", () => {
        const {asFragment} = render(<SaleSash saleSashUrl={null} isOnSale saleSashPosition={SaleSashPosition.TL} />)
        expect(asFragment()).toMatchSnapshot()
    })

    it("When not on sale, it should match the snapshot ", () => {
        const {asFragment} = render(
            <SaleSash saleSashUrl="test.jpg" isOnSale={false} saleSashPosition={SaleSashPosition.TL} />,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
