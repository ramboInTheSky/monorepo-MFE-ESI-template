import {mockState, mockText} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Components/Banner - Given connect - mapStateToProps()", () => {
    it("should transform target with the siteurl", () => {
        const siteUrl = "http://superman/en/gb"

        const newMockState = {
            ...mockState,
            request: {
                ...mockState.request,
                siteUrl,
            },
            secondarynav: {
                ...mockState.secondarynav,
                catalogues: {
                    men: {
                        ...mockState.secondarynav.catalogues.men,
                        banner: {
                            ...mockState.secondarynav.catalogues.men.banner,
                            imageUrl: "//preview-next/abc/iam.jpg",
                            target: "/abc123",
                        },
                    },
                },
            },
            text: mockText
        }

        const got = mapStateToProps(newMockState)
        const bannerResult = {
            imageUrl: "//preview-next/abc/iam.jpg",
            siteUrl: "http://superman/en/gb",
            target: `/abc123`,
            text: { bannerAltText: newMockState.text.bannerAltText }
        }
        expect(got).toEqual(bannerResult)
    })
    it("should transform imageUrl with the siteurl", () => {
        const setSiteUrl = "http://superman/gb/en"
        const formatSiteUrl = "http://superman"

        const newMockState = {
            ...mockState,
            request: {
                ...mockState.request,
                siteUrl: setSiteUrl,
            },
            secondarynav: {
                ...mockState.secondarynav,
                catalogues: {
                    men: {
                        ...mockState.secondarynav.catalogues.men,
                        banner: {
                            ...mockState.secondarynav.catalogues.men.banner,
                            imageUrl: "/preview-next/abc/iam.jpg",
                            target: "",
                        },
                    },
                },
            },
            text: mockText
        }

        const got = mapStateToProps(newMockState)
        const bannerResult = {
            imageUrl: `${formatSiteUrl}/preview-next/abc/iam.jpg`,
            siteUrl: "http://superman/gb/en",
            target: null,
            text: { bannerAltText: newMockState.text.bannerAltText }
        }
        expect(got).toEqual(bannerResult)
    })
})
