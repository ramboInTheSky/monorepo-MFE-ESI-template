import env from "../../config/env"
import quickLinksConfig from "../../config/categoryQuickLinks.json"
import {CategoryQuickLinksData} from "./types"
import {createMockStoreForRequest} from "../../../__mocks__/mockStore"
import {REALM_HEADER, TERRITORY_HEADER} from "../../config/constants"

import reducer, {initialState, getCategoryQuickLinks, assignCategoryQuickLinks, populateCategoryQuickLinks} from "."

const {REACT_APP_CDN_BASEURL} = env

describe("category quick links: reducer", () => {
    describe("by default", () => {
        it("should return the initial state", () => {
            const result = reducer(undefined, {type: "FOO"} as any)
            expect(result).toEqual(initialState)
        })
    })

    describe("assignCategoryQuickLinks()", () => {
        it("should assign the correct quick link items", () => {
            const realm = "amido"
            const territory = "gb"
            const siteUrl = "http://some-site-url"
            const result = reducer(undefined, assignCategoryQuickLinks(realm, territory, siteUrl))
            const expectedItems = getCategoryQuickLinks(realm, territory, siteUrl, quickLinksConfig)
            expect(result).toEqual({items: expectedItems})
        })
    })

    describe("populateCategoryQuickLinks", () => {
        it("should determine params for assigning quick link items and assign it", () => {
            const realm = "amido"
            const territory = "gb"
            const siteUrl = "http://site.url"
            const store = createMockStoreForRequest({
                page: 14,
                siteUrl,
                headers: {
                    [REALM_HEADER]: realm,
                    [TERRITORY_HEADER]: territory,
                },
            })

            store.dispatch(populateCategoryQuickLinks())

            expect(store.getActions()).toEqual([assignCategoryQuickLinks(realm, territory, siteUrl)])
        })
    })
})

describe("category quick links: getCategoryQuickLinks", () => {
    const siteUrl = "http://some-site-url"
    const config: CategoryQuickLinksData = {
        amido: {
            uk: [
                {
                    href: "{SITE_URL}/uk/foo",
                    title: "uk foo",
                    description: "uk bar",
                    imageSrc: "{CDN_URL}/uk/foo",
                    imageAlt: "uk foo",
                },
            ],
            international: [
                {
                    href: "{SITE_URL}/int/foo",
                    title: "int foo",
                    description: "int bar",
                    imageSrc: "{CDN_URL}/int/foo",
                    imageAlt: "int foo",
                },
            ],
        },
    }

    describe("when there are quick links", () => {
        describe("when the territory is `gb`", () => {
            it("should return the uk territories", () => {
                expect(getCategoryQuickLinks("amido", "gb", siteUrl, config)).toEqual([
                    {
                        href: `${siteUrl}/uk/foo`,
                        title: "uk foo",
                        description: "uk bar",
                        imageSrc: `${REACT_APP_CDN_BASEURL}/uk/foo`,
                        imageAlt: "uk foo",
                    },
                ])
            })
        })

        describe("when the territory is not `gb`", () => {
            it("should return the international territories", () => {
                expect(getCategoryQuickLinks("amido", "tt", siteUrl, config)).toEqual([
                    {
                        href: `${siteUrl}/int/foo`,
                        title: "int foo",
                        description: "int bar",
                        imageSrc: `${REACT_APP_CDN_BASEURL}/int/foo`,
                        imageAlt: "int foo",
                    },
                ])
            })
        })
    })

    describe("when the realm does not exist", () => {
        it("should return an empty array", () => {
            expect(getCategoryQuickLinks("foo", "gb", siteUrl, config)).toEqual([])
        })
    })
})
