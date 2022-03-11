import React from "react"
import {render} from "@testing-library/react"

import {Typography} from "@mui/material"
import {ExpansionTitle, ExpansionPanel, ExpansionPanelDetails, ExpandIcon} from "./components"

describe("Common/Accordion - Components", () => {
    it("should match the snapshot - ExpansionTitle", () => {
        const {asFragment} = render(<ExpansionTitle textcolor="#000" />)
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot - ExpansionPanel", () => {
        const {asFragment} = render(
            <ExpansionPanel border="#000 solid 1px">
                <Typography>d</Typography>
            </ExpansionPanel>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot - ExpansionPanelDetails", () => {
        const {asFragment} = render(
            <ExpansionPanelDetails>
                <Typography>d</Typography>
            </ExpansionPanelDetails>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot - ExpandIcon", () => {
        const {asFragment} = render(<ExpandIcon arrowIconUrl="http://superman.com/icon/arrow.png" />)
        expect(asFragment()).toMatchSnapshot()
    })
})
