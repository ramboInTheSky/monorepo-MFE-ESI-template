import React from "react"
import {render} from "@testing-library/react"
import {IS_BROWSER} from "../../utils/window"
import {SeoHeading} from "."

jest.mock("../../utils/window", () => ({
    IS_BROWSER: jest.fn(),
}))

jest.mock("../../utils/createHeadingEsiTag", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(() => `<div>Test</div>`),
}))

describe("Given Seo Heading", () => {
    it("renders correctly if not browser", () => {
        ;(IS_BROWSER as any).mockImplementation(() => false)
        const {asFragment} = render(
            <SeoHeading siteUrl="http://www.test.com" url="url" useDevEsi totalResults={10} title="t-shirts" />,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("renders correctly if browser", () => {
        ;(IS_BROWSER as any).mockImplementation(() => true)
        const {asFragment} = render(
            <SeoHeading siteUrl="http://www.test.com" url="url" useDevEsi totalResults={10} title="t-shirts" />,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
