import React from "react"
import {render, screen} from "@testing-library/react"
import {Catalogue, CatalogueProps} from "."

jest.mock("../CatalogueList", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>CatalogueList</div>,
}))

describe("Catalogue", () => {
    let props: CatalogueProps
    beforeEach(() => {
        const columns = [
            {
                title: "Column 1",
                type: "column",
                items: [
                    {
                        title: "",
                        type: "category",
                        icon: {width: 25, height: 25, url: "/some-cool-img-path"},
                        items: [
                            {
                                title: "New In",
                                type: "link",
                                target:
                                    "/shop/gender-newborngirls-gender-newbornunisex-gender-oldergirls-gender-youngergirls/feat-newin",
                                icon: null,
                                linkColour: "",
                                fontWeight: "",
                                fontFamily: null,
                            },
                        ],
                        linkColour: "",
                        fontWeight: "",
                        fontFamily: null,
                    },
                ],
            },
        ] as any
        const department = "sample department"
        const tab = "sample tab"
        const hasMissions = true
        props = {
            columns,
            department,
            tab,
            hasMissions,
        }
    })

    it("should match the snapshot", () => {
        const {asFragment} = render(<Catalogue {...props} />)
        expect(asFragment()).toMatchSnapshot()
    })
    it("should render a catalogue display", () => {
        render(<Catalogue {...props} />)
        const element = screen.getByTestId("catalogue")
        expect(element).toBeInTheDocument()

        const loadingElement = screen.queryByText("loading")
        expect(loadingElement).not.toBeInTheDocument()
    })
})
