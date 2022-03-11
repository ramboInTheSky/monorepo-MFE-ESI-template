import React from "react"
import {render} from "@testing-library/react"
import {IS_BROWSER} from "../../utils/window"
import {SearchBanner} from "."
import {SearchApiRequestTypes} from "../../config/constants"
import {mockText} from "../../../__mocks__/mockStore"

jest.mock("../../utils/window", () => ({
    IS_BROWSER: jest.fn(),
}))

jest.mock("../../utils/createSearchBannerEsiTag", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(() => `<div>Test</div>`),
}))

describe("Given SearchBanner - Index", () => {
    it("renders correctly without html", () => {
        ;(IS_BROWSER as any).mockImplementation(() => false)
        const {asFragment} = render(
            <SearchBanner
                siteUrl="http://www.test.com"
                url="url"
                useDevEsi
                html={null}
                requestType={SearchApiRequestTypes.Category}
                includedComponents={["search-banner"]}
                enableSearchBanners
                text={mockText}
            />,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("renders correctly without html if IS_BROWSER", () => {
        ;(IS_BROWSER as any).mockImplementation(() => true)
        const {asFragment} = render(
            <SearchBanner
                siteUrl="http://www.test.com"
                url="url"
                useDevEsi
                html={null}
                requestType={SearchApiRequestTypes.Category}
                includedComponents={["search-banner"]}
                enableSearchBanners
                text={mockText}
            />,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("renders correctly with html if IS_BROWSER", () => {
        ;(IS_BROWSER as any).mockImplementation(() => true)
        const {asFragment} = render(
            <SearchBanner
                siteUrl="http://www.test.com"
                url="url"
                useDevEsi
                html={`<div>Test</div>`}
                requestType={SearchApiRequestTypes.Category}
                includedComponents={["search-banner"]}
                enableSearchBanners
                text={mockText}
            />,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("renders correctly with html if there are no search-banners", () => {
        ;(IS_BROWSER as any).mockImplementation(() => true)
        const {asFragment} = render(
            <SearchBanner
                siteUrl="http://www.test.com"
                url="url"
                useDevEsi
                html={`<div>Test</div>`}
                requestType={SearchApiRequestTypes.Category}
                includedComponents={[]}
                enableSearchBanners
                text={mockText}
            />,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should not render search banner if includedComponents is wrong", () => {
        ;(IS_BROWSER as any).mockImplementation(() => false)
        const {asFragment} = render(
            <SearchBanner
                siteUrl="http://www.test.com"
                url="url"
                useDevEsi
                html={null}
                requestType={SearchApiRequestTypes.Category}
                includedComponents={["search-banner-test"]}
                enableSearchBanners
                text={mockText}
            />,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should not render search banner if browser and html is null", () => {
        ;(IS_BROWSER as any).mockImplementation(() => true)
        const {asFragment} = render(
            <SearchBanner
                siteUrl="http://www.test.com"
                url="url"
                useDevEsi
                html={null}
                requestType={SearchApiRequestTypes.Category}
                includedComponents={["search-banner"]}
                enableSearchBanners
                text={mockText}
            />,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given SearchBanner - Feature Switch OFF", () => {
    it("should not render search banner even if there is html", () => {
        ;(IS_BROWSER as any).mockImplementation(() => true)
        const {asFragment} = render(
            <SearchBanner
                siteUrl="http://www.test.com"
                url="url"
                useDevEsi
                html={`<div>Test</div>`}
                requestType={SearchApiRequestTypes.Category}
                includedComponents={["search-banner"]}
                enableSearchBanners={false}
                text={mockText}
            />,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
