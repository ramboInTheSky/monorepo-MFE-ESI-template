import {render} from "@testing-library/react"
import React from "react"
import {SeoLink, buildUrl} from "."

describe("SeoLink", () => {
    it("should render as expected with next page", () => {
        const {asFragment} = render(<SeoLink url="http://batman.com?p=1" hasNextPage title="Next Page" />)
        expect(asFragment()).toMatchSnapshot()
    })

    it("should render as expected with previous page", () => {
        const {asFragment} = render(<SeoLink url="http://batman.com?p=2" title="Previous Page" />)
        expect(asFragment()).toMatchSnapshot()
    })

    it("should not render as expected with no previous pages available", () => {
        const {asFragment} = render(<SeoLink url="http://batman.com?p=1" title="Previous Page" />)
        expect(asFragment()).toMatchSnapshot()
    })

    it("should not render as expected with no next pages available", () => {
        const {asFragment} = render(<SeoLink url="http://batman.com?p=2" hasNextPage={false} title="Next Page" />)
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("buildUrl", () => {
    it("builds the url going forwards", () => {
        const result = buildUrl({url: "http://batman.com?p=1", hasNextPage: true})
        expect(result).toEqual("http://batman.com?p=2")
    })

    it("handles going forwards where page is NaN", () => {
        const result = buildUrl({url: "http://batman.com", hasNextPage: true})
        expect(result).toEqual("http://batman.com?p=2")
    })

    it("builds the url going backwards", () => {
        const result = buildUrl({url: "http://batman.com?p=3", hasNextPage: false})
        expect(result).toEqual("http://batman.com?p=2")
    })

    it("handles going backwards where page is NaN", () => {
        const result = buildUrl({url: "http://batman.com", hasNextPage: false})
        expect(result).toEqual(null)
    })

    it("removes the p param when going back to page 1", () => {
        const result = buildUrl({url: "http://batman.com?p=2", hasNextPage: false})
        expect(result).toEqual("http://batman.com")
    })

    it("strips trailing & when going back to page 1", () => {
        const result = buildUrl({url: "http://batman.com?w=red&p=2", hasNextPage: false})
        expect(result).toEqual("http://batman.com?w=red")
    })
})
