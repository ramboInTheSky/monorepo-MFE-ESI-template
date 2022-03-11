import React from "react"
import {render} from "@testing-library/react"
import {TabShocks, Container, ContainerProps} from "./component"

describe("Tabs components: ", () => {
    describe("Container: ", () => {
        it("should match the snapshot ", () => {
            const props: ContainerProps = {activeTabIndex: 1, noOfTabs: 3}
            const {asFragment} = render(<Container {...props} />)
            expect(asFragment()).toMatchSnapshot()
        })
        describe("TabShocks: ", () => {
            it("should match the snapshot ", () => {
                const {asFragment} = render(<TabShocks />)
                expect(asFragment()).toMatchSnapshot()
            })
        })
    })
})
