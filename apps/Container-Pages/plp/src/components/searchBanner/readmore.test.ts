import {setReadMoreListener, updateReadMore, setupReadMore, checkTruncation} from "./readmore"
import {mockText as text} from "../../../__mocks__/mockStore"

const divElement = `
    <div data-testid="plp-search-banner-copy" id="search-banner-copy">
        <div data-testid="plp-search-banner-copy-text" class="search-banner-copy-text">
            <p data-testid="search-banner-read-more-content" id="search-banner-read-more-content" class="search-banner-read-more-content">
                URL = __URL__ Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum
                interdum, nisi lorem egestas vitae scel erisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
                congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed
                ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui
                eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor
                porta.
            </p>
        </div>
        <div data-testid="plp-search-banner-copy-read-more" class="search-banner-copy-read-more">
        <button data-testid="search-banner-read-more" id="search-banner-read-more" data-openclose="open">+ Read more</button>
        </div>
    </div>
`

describe("Given readmore - setupReadMore() - before click", () => {
    document.body.innerHTML = divElement

    describe("Given setReadMoreListener", () => {
        it("should set readmore class correctly", () => {
            const buttonElement = document.getElementById("search-banner-read-more")

            const pElement = setReadMoreListener(buttonElement, jest.fn())

            expect(pElement?.attributes.getNamedItem("class")?.value).toEqual("readmore")
        })

        it("should set event listener correctly", () => {
            const buttonElement = document.getElementById("search-banner-read-more")
            if (!buttonElement) throw new Error() // shut up Typescript
            buttonElement.removeEventListener = jest.fn()
            buttonElement.addEventListener = jest.fn()

            setReadMoreListener(buttonElement, jest.fn())

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(buttonElement?.removeEventListener).toHaveBeenCalledTimes(2)
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(buttonElement?.addEventListener).toHaveBeenCalledTimes(2)
        })

        it("should not set event listener correctly", () => {
            window.removeEventListener = jest.fn()
            window.addEventListener = jest.fn()

            setReadMoreListener(undefined, jest.fn())

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(window.removeEventListener).toHaveBeenCalledTimes(0)
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(window.addEventListener).toHaveBeenCalledTimes(0)
        })

        it("should update read more button correctly", () => {
            document.body.innerHTML = divElement

            const buttonElement = document.getElementById("search-banner-read-more")
            const contentElement = document.getElementById("search-banner-read-more-content")

            updateReadMore(buttonElement, contentElement, text)

            expect(buttonElement?.innerText).toContain("- Read less")
        })
    })
})

describe("Given readmore - setupReadMore() - after click", () => {
    document.body.innerHTML = `
    <div data-testid="plp-search-banner-copy" id="search-banner-copy">
        <div data-testid="plp-search-banner-copy-text" class="search-banner-copy-text">
            <p data-testid="search-banner-read-more-content" id="search-banner-read-more-content" class="search-banner-read-more-content">
                URL = __URL__ Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum
                interdum, nisi lorem egestas vitae scel erisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
                congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed
                ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui
                eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor
                porta.
            </p>
        </div>
        <div data-testid="plp-search-banner-copy-read-more" class="search-banner-copy-read-more">
        <div data-testid="search-banner-read-more" id="search-banner-read-more" data-openclose="close">- Read less</div>
        </div>
    </div>
   `

    describe("Given setReadMoreListener", () => {
        it("should update read more button correctly", () => {
            const buttonElement = document.getElementById("search-banner-read-more")
            const contentElement = document.getElementById("search-banner-read-more-content")

            updateReadMore(buttonElement, contentElement, text)
            expect(buttonElement?.innerText).toContain("+ Read more")
        })

        it("should call handleClick correctly", () => {
            const readMore = setupReadMore(text)

            expect(readMore.handleClick()).toEqual(true)
        })
    })
})

describe("checkTruncation", () => {
    it("sets the button to show if the content is truncated", () => {
        const buttonEl = {getAttribute: () => "open", style: {display: null}}
        const contentEl = {scrollHeight: 200, clientHeight: 100}
        checkTruncation(buttonEl, contentEl, "block")
        expect(buttonEl.style.display).toEqual("block")
    })

    it("sets the button to hide if the content is not truncated", () => {
        const buttonEl = {getAttribute: () => "open", style: {display: null}}
        const contentEl = {scrollHeight: 100, clientHeight: 200}
        checkTruncation(buttonEl, contentEl, "block")
        expect(buttonEl.style.display).toEqual("none")
    })
})
