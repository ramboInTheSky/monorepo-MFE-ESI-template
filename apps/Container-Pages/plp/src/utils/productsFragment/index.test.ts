import {appendFilterData, createProductsFragment, mapProductsFragmentToItems} from "."
import createProductSummaryEsiTag from "../createProductSummaryEsiTag"
import {NEXT_PAGE, PREV_PAGE, FILTERING, NO_LAZYLOAD} from "../../models/Lazyload"

jest.mock("../createProductSummaryEsiTag", () => ({
    __esModule: true,
    default: jest.fn(),
}))

function mockCreateProductSummaryEsiTag() {
    ;(createProductSummaryEsiTag as any).mockImplementation((itemNumber, newIn) => {
        return `<esi i=${itemNumber} n=${newIn} />`
    })
}

describe(`Given ${createProductsFragment.name}`, () => {
    beforeEach(mockCreateProductSummaryEsiTag)
    afterEach(jest.clearAllMocks)

    describe("When given an array of product items", () => {
        it("should return a products fragment string", () => {
            const fragment = createProductsFragment(
                [
                    {itemNumber: "1", newIn: false},
                    {itemNumber: "2", newIn: true},
                ],
                "www.test.com",
                false,
            )

            expect(fragment).toBe("<==>1<=>false<=><esi i=1 n=false /><==>2<=>true<=><esi i=2 n=true />")
        })
    })
})

describe("Given a appendFilterData", () => {
    const mockFilterJson = {test: "test"}
    const mockFragment = "<==>1<=>false<=><esi i=1 n=false /><==>2<=>true<=><esi i=2 n=true />"

    it("should return the expected string", () => {
        expect(appendFilterData(mockFragment, mockFilterJson as any)).toEqual(
            '{"test":"test"}<=ProductFragment=><==>1<=>false<=><esi i=1 n=false /><==>2<=>true<=><esi i=2 n=true />',
        )
    })
})

describe(`Given ${mapProductsFragmentToItems.name}`, () => {
    beforeEach(mockCreateProductSummaryEsiTag)
    afterEach(jest.clearAllMocks)

    describe(`When given a products fragment string created with ${createProductsFragment.name}`, () => {
        it("should return an array of product items and setting the first item as lazyload productImages to true when type is NO_LAZYLOAD", () => {
            const lazyloadFrom = 2
            const items = mapProductsFragmentToItems(
                `<==>1<=>false<=><esi i=1 n=false>window.ssrClientSettings.productSummary["1"]={_STATE_:{"lazyload":{"colourchips":true,"productImages":false}}}</esi>
                 <==>2<=>true<=><esi i=2 n=true>window.ssrClientSettings.productSummary["2"]={_STATE_:{"lazyload":{"colourchips":true,"productImages":false}}}</esi>
                 <==>3<=>true<=><esi i=3 n=true>window.ssrClientSettings.productSummary["3"]={_STATE_:{"lazyload":{"colourchips":true,"productImages":false}}}</esi>`,
                lazyloadFrom,
                NO_LAZYLOAD,
            )

            expect(items).toMatchInlineSnapshot(`
                Object {
                  "items": Array [
                    Object {
                      "html": "<esi i=1 n=false>window.ssrClientSettings.productSummary[\\"1\\"]={_STATE_:{\\"lazyload\\":{\\"colourchips\\":true,\\"productImages\\":false}}}</esi>
                                 ",
                      "itemNumber": "1",
                      "newIn": false,
                    },
                    Object {
                      "html": "<esi i=2 n=true>window.ssrClientSettings.productSummary[\\"2\\"]={_STATE_:{\\"lazyload\\":{\\"colourchips\\":true,\\"productImages\\":false}}}</esi>
                                 ",
                      "itemNumber": "2",
                      "newIn": true,
                    },
                    Object {
                      "html": "<esi i=3 n=true>window.ssrClientSettings.productSummary[\\"3\\"]={_STATE_:{\\"lazyload\\":{\\"colourchips\\":true,\\"productImages\\":false}}}</esi>",
                      "itemNumber": "3",
                      "newIn": true,
                    },
                  ],
                  "searchBannerHtml": "<div></div>",
                  "searchStateData": null,
                }
            `)
        })
        it("should return an array of product items and setting the first item as lazyload productImages to true when type is FILTERING", () => {
            const lazyloadFrom = 2
            const items = mapProductsFragmentToItems(
                `<==>1<=>false<=><esi i=1 n=false>window.ssrClientSettings.productSummary["1"]={_STATE_:{"lazyload":{"colourchips":true,"productImages":false}}}</esi>
                 <==>2<=>true<=><esi i=2 n=true>window.ssrClientSettings.productSummary["2"]={_STATE_:{"lazyload":{"colourchips":true,"productImages":false}}}</esi>
                 <==>3<=>true<=><esi i=3 n=true>window.ssrClientSettings.productSummary["3"]={_STATE_:{"lazyload":{"colourchips":true,"productImages":false}}}</esi>`,
                lazyloadFrom,
                FILTERING,
            )

            expect(items).toMatchInlineSnapshot(`
                Object {
                  "items": Array [
                    Object {
                      "html": "<esi i=1 n=false>window.ssrClientSettings.productSummary[\\"1\\"]={_STATE_:{\\"lazyload\\":{\\"colourchips\\":true,\\"productImages\\":false}}}</esi>
                                 ",
                      "itemNumber": "1",
                      "newIn": false,
                    },
                    Object {
                      "html": "<esi i=2 n=true>window.ssrClientSettings.productSummary[\\"2\\"]={_STATE_:{\\"lazyload\\":{\\"colourchips\\":true,\\"productImages\\":false}}}</esi>
                                 ",
                      "itemNumber": "2",
                      "newIn": true,
                    },
                    Object {
                      "html": "<esi i=3 n=true>window.ssrClientSettings.productSummary[\\"3\\"]={_STATE_:{\\"lazyload\\":{\\"colourchips\\":true,\\"productImages\\":true}}}</esi>",
                      "itemNumber": "3",
                      "newIn": true,
                    },
                  ],
                  "searchBannerHtml": "<div></div>",
                  "searchStateData": null,
                }
            `)
        })
        it("should return an array of product items and setting the first item as lazyload productImages to true when type is PREV_PAGE", () => {
            const lazyloadFrom = 2
            const items = mapProductsFragmentToItems(
                `<==>1<=>false<=><esi i=1 n=false>window.ssrClientSettings.productSummary["1"]={_STATE_:{"lazyload":{"colourchips":true,"productImages":false}}}</esi>
                 <==>2<=>true<=><esi i=2 n=true>window.ssrClientSettings.productSummary["2"]={_STATE_:{"lazyload":{"colourchips":true,"productImages":false}}}</esi>
                 <==>3<=>true<=><esi i=3 n=true>window.ssrClientSettings.productSummary["3"]={_STATE_:{"lazyload":{"colourchips":true,"productImages":false}}}</esi>`,
                lazyloadFrom,
                PREV_PAGE,
            )

            expect(items).toMatchInlineSnapshot(`
                Object {
                  "items": Array [
                    Object {
                      "html": "<esi i=1 n=false>window.ssrClientSettings.productSummary[\\"1\\"]={_STATE_:{\\"lazyload\\":{\\"colourchips\\":true,\\"productImages\\":true}}}</esi>
                                 ",
                      "itemNumber": "1",
                      "newIn": false,
                    },
                    Object {
                      "html": "<esi i=2 n=true>window.ssrClientSettings.productSummary[\\"2\\"]={_STATE_:{\\"lazyload\\":{\\"colourchips\\":true,\\"productImages\\":false}}}</esi>
                                 ",
                      "itemNumber": "2",
                      "newIn": true,
                    },
                    Object {
                      "html": "<esi i=3 n=true>window.ssrClientSettings.productSummary[\\"3\\"]={_STATE_:{\\"lazyload\\":{\\"colourchips\\":true,\\"productImages\\":false}}}</esi>",
                      "itemNumber": "3",
                      "newIn": true,
                    },
                  ],
                  "searchBannerHtml": "<div></div>",
                  "searchStateData": null,
                }
            `)
        })

        it("should return an array of product items and setting the last item as lazyload productImages to true when type is NEXT_PAGE", () => {
            const lazyloadFrom = 2
            const items = mapProductsFragmentToItems(
                `<==>1<=>false<=><esi i=1 n=false>window.ssrClientSettings.productSummary["1"]={_STATE_:{"lazyload":{"colourchips":true,"productImages":false}}}</esi>
                <==>2<=>true<=><esi i=2 n=true>window.ssrClientSettings.productSummary["2"]={_STATE_:{"lazyload":{"colourchips":true,"productImages":false}}}</esi>
                <==>3<=>true<=><esi i=3 n=true>window.ssrClientSettings.productSummary["3"]={_STATE_:{"lazyload":{"colourchips":true,"productImages":false}}}</esi>`,
                lazyloadFrom,
                NEXT_PAGE,
            )

            expect(items).toMatchInlineSnapshot(`
                Object {
                  "items": Array [
                    Object {
                      "html": "<esi i=1 n=false>window.ssrClientSettings.productSummary[\\"1\\"]={_STATE_:{\\"lazyload\\":{\\"colourchips\\":true,\\"productImages\\":false}}}</esi>
                                ",
                      "itemNumber": "1",
                      "newIn": false,
                    },
                    Object {
                      "html": "<esi i=2 n=true>window.ssrClientSettings.productSummary[\\"2\\"]={_STATE_:{\\"lazyload\\":{\\"colourchips\\":true,\\"productImages\\":false}}}</esi>
                                ",
                      "itemNumber": "2",
                      "newIn": true,
                    },
                    Object {
                      "html": "<esi i=3 n=true>window.ssrClientSettings.productSummary[\\"3\\"]={_STATE_:{\\"lazyload\\":{\\"colourchips\\":true,\\"productImages\\":true}}}</esi>",
                      "itemNumber": "3",
                      "newIn": true,
                    },
                  ],
                  "searchBannerHtml": "<div></div>",
                  "searchStateData": null,
                }
            `)
        })

        it("should return an array of product items for matching SearchBanner Tag", () => {
          const lazyloadFrom = 2
          const items = mapProductsFragmentToItems("<div /><=SearchBanner=><div />",
              lazyloadFrom,
              NEXT_PAGE,
          )

          expect(items).toMatchInlineSnapshot(`
              Object {
                "items": Array [
                  Object {
                    "html": undefined,
                    "itemNumber": "<div /><=SearchBanner=><div />",
                    "newIn": false,
                  },
                ],
                "searchBannerHtml": "<div />",
                "searchStateData": null,
              }
          `)
      })
        it("should return an array of product items and set the search-banner", () => {
            const lazyloadFrom = 2
            const items = mapProductsFragmentToItems(
                `<==>1<=>false<=><esi i=1 n=false>window.ssrClientSettings.productSummary["1"]={_STATE_:{"lazyload":{"colourchips":true,"productImages":false}}}</esi>
              <==>2<=>true<=><esi i=2 n=true>window.ssrClientSettings.productSummary["2"]={_STATE_:{"lazyload":{"colourchips":true,"productImages":false}}}</esi>
              <==>3<=>true<=><esi i=3 n=true>window.ssrClientSettings.productSummary["3"]={_STATE_:{"lazyload":{"colourchips":true,"productImages":false}}}</esi>
              <=SearchBanner=><esi:include src="www.test.com/search-banners/criteria%3Dwww.test.co.uk" onerror="continue" dca="none"/>`,
                lazyloadFrom,
                NO_LAZYLOAD,
            )

            expect(items).toMatchInlineSnapshot(`
                Object {
                  "items": Array [
                    Object {
                      "html": "<esi i=1 n=false>window.ssrClientSettings.productSummary[\\"1\\"]={_STATE_:{\\"lazyload\\":{\\"colourchips\\":true,\\"productImages\\":false}}}</esi>
                              ",
                      "itemNumber": "1",
                      "newIn": false,
                    },
                    Object {
                      "html": "<esi i=2 n=true>window.ssrClientSettings.productSummary[\\"2\\"]={_STATE_:{\\"lazyload\\":{\\"colourchips\\":true,\\"productImages\\":false}}}</esi>
                              ",
                      "itemNumber": "2",
                      "newIn": true,
                    },
                    Object {
                      "html": "<esi i=3 n=true>window.ssrClientSettings.productSummary[\\"3\\"]={_STATE_:{\\"lazyload\\":{\\"colourchips\\":true,\\"productImages\\":false}}}</esi>
                              <=SearchBanner=><esi:include src=\\"www.test.com/search-banners/criteria%3Dwww.test.co.uk\\" onerror=\\"continue\\" dca=\\"none\\"/>",
                      "itemNumber": "3",
                      "newIn": true,
                    },
                  ],
                  "searchBannerHtml": "<esi:include src=\\"www.test.com/search-banners/criteria%3Dwww.test.co.uk\\" onerror=\\"continue\\" dca=\\"none\\"/>",
                  "searchStateData": null,
                }
            `)
        })
    })
})
