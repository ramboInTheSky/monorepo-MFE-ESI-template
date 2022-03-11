import React from "react"
import {render} from "@testing-library/react"
import Product, {productIdFor} from "."
import {IS_BROWSER} from "../../utils/window"

jest.mock("../../utils/window", () => ({
    IS_BROWSER: jest.fn(),
}))

describe("Product: ", () => {
    describe("By default", () => {
        it("should not update once rendered", () => {
            const instance = new Product({} as any)
            expect(instance.shouldComponentUpdate()).toBe(false)
        })
    })

    describe("When running on the server", () => {
        it("and new in is false, it should render the appropriate esi tag ", () => {
            ;(IS_BROWSER as any).mockImplementation(() => false)
            const {asFragment} = render(
                <Product itemNumber="test_pid" newIn={false} siteUrl="http://www.test.com" useDevEsi />,
            )
            expect(asFragment()).toMatchInlineSnapshot(`
                <DocumentFragment>
                  <div
                    data-pid="test_pid"
                    id="plp-product-summary-entrypoint-test_pid"
                  >
                    <esi:include
                      dca="none"
                      onerror="continue"
                      src="esiurl/product-summary/test_pid?show-new-in=false"
                    />
                  </div>
                </DocumentFragment>
            `)
        })
        it("and new in is true, it should render the appropriate esi tag", () => {
            ;(IS_BROWSER as any).mockImplementation(() => false)
            const {asFragment} = render(<Product itemNumber="test_pid" newIn siteUrl="http://www.test.com" useDevEsi />)
            expect(asFragment()).toMatchInlineSnapshot(`
                <DocumentFragment>
                  <div
                    data-pid="test_pid"
                    id="plp-product-summary-entrypoint-test_pid"
                  >
                    <esi:include
                      dca="none"
                      onerror="continue"
                      src="esiurl/product-summary/test_pid?show-new-in=true"
                    />
                  </div>
                </DocumentFragment>
            `)
        })
        it("and new in is true and itemType is present, it should render the appropriate esi tag", () => {
            ;(IS_BROWSER as any).mockImplementation(() => false)
            const {asFragment} = render(
                <Product itemNumber="test_pid" newIn siteUrl="http://www.test.com" useDevEsi itemType="suit" />,
            )
            expect(asFragment()).toMatchInlineSnapshot(`
                <DocumentFragment>
                  <div
                    data-pid="test_pid"
                    id="plp-product-summary-entrypoint-test_pid"
                  >
                    <esi:include
                      dca="none"
                      onerror="continue"
                      src="esiurl/product-summary/suit/test_pid?show-new-in=true"
                    />
                  </div>
                </DocumentFragment>
            `)
        })
    })

    describe("When running on the client", () => {
        describe("and there is existing html in the dom", () => {
            const WithExistingHtml = ({children, itemNumber}: any) => {
                return (
                    <>
                        {children}
                        <div id={productIdFor(itemNumber)}>Existing html...</div>
                    </>
                )
            }
            it("and the html prop has not been supplied, it should render the existing html", () => {
                ;(IS_BROWSER as any).mockImplementation(() => true)
                const pid = "test_pid"
                const {asFragment} = render(
                    <WithExistingHtml itemNumber={pid}>
                        <Product itemNumber={pid} newIn={false} siteUrl="http://www.test.com" useDevEsi />
                    </WithExistingHtml>,
                )
                expect(asFragment()).toMatchInlineSnapshot(`
                    <DocumentFragment>
                      <div
                        data-pid="test_pid"
                        id="plp-product-summary-entrypoint-test_pid"
                      />
                      <div
                        id="plp-product-summary-entrypoint-test_pid"
                      >
                        Existing html...
                      </div>
                    </DocumentFragment>
                `)
            })

            it("and the html prop value has been supplied, it should still render the existing html even", () => {
                ;(IS_BROWSER as any).mockImplementation(() => true)
                const pid = "test_pid"
                const html = `<div>Some html fragment...</div>`
                const {asFragment} = render(
                    <WithExistingHtml itemNumber={pid}>
                        <Product itemNumber={pid} newIn={false} html={html} siteUrl="http://www.test.com" useDevEsi />
                    </WithExistingHtml>,
                )
                expect(asFragment()).toMatchInlineSnapshot(`
                    <DocumentFragment>
                      <div
                        data-pid="test_pid"
                        id="plp-product-summary-entrypoint-test_pid"
                      >
                        <div>
                          Some html fragment...
                        </div>
                      </div>
                      <div
                        id="plp-product-summary-entrypoint-test_pid"
                      >
                        Existing html...
                      </div>
                    </DocumentFragment>
                `)
            })
        })

        describe("and there is no existing html in the dom", () => {
            it("should render the html fragment that is supplied to the component", () => {
                ;(IS_BROWSER as any).mockImplementation(() => true)
                const html = `<div>Some html fragment...</div>`
                const {asFragment} = render(
                    <Product itemNumber="test_pid" newIn={false} html={html} siteUrl="http://www.test.com" useDevEsi />,
                )
                expect(asFragment()).toMatchInlineSnapshot(`
                    <DocumentFragment>
                      <div
                        data-pid="test_pid"
                        id="plp-product-summary-entrypoint-test_pid"
                      >
                        <div>
                          Some html fragment...
                        </div>
                      </div>
                    </DocumentFragment>
                `)
            })
            it("when no html fragment is supplied, it should render an empty product summary", () => {
                ;(IS_BROWSER as any).mockImplementation(() => true)
                const {asFragment} = render(
                    <Product itemNumber="test_pid" newIn={false} siteUrl="http://www.test.com" useDevEsi />,
                )
                expect(asFragment()).toMatchInlineSnapshot(`
                    <DocumentFragment>
                      <div
                        data-pid="test_pid"
                        id="plp-product-summary-entrypoint-test_pid"
                      />
                    </DocumentFragment>
                `)
            })
        })
    })
})
