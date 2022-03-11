import React from "react"
import {render, cleanup, fireEvent, screen} from "@testing-library/react"
import SearchBannerChevron from "."

const componentToTest = <SearchBannerChevron />

describe("Given a SearchBannerChevron", () => {
    document.body.innerHTML = `<div data-testid="plp-search-banner">
    <p data-testid="search-banner-mobile-read-more-content" id="search-banner-mobile-read-more-content"></p>
    <div data-testid="plp-search-banner-container" class="search-banner-container">
      <div data-testid="plp-search-banner-image-column" class="search-banner-image-column">
        <div data-testid="plp-search-banner-small-image" class="search-banner-small-image">
            <img
              src="https://www.amido.com/content/platMod/images/plp/searchBanners/ImagePlaceholder.jpg"
              alt="Girl in a jacket"
              height="100%"
              width="100%"
            />
        </div>  
        <div data-testid="plp-search-banner-large-image" class="search-banner-large-image">
          <img
            src="https://www.amido.com/content/platMod/images/plp/searchBanners/ImagePlaceholder.jpg"
            alt="Girl in a jacket"
            height="100%"
            width="100%"
          />
        </div>
      </div>
      <div data-testid="plp-search-banner-text-column" class="search-banner-text-column">
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
            <div data-testid="search-banner-read-more" id="search-banner-read-more" data-openclose="open">+ Read more</div>
          </div>
        </div>
        <div data-testid="plp-search-banner-quick-links" class="search-banner-quick-links">
          <a
            href="/shop/department-homeware-productaffiliation-bedding/category-bedsets-category-duvetcover"
            class="search-quick-link"
            >Link 1</a
          >
          <a
            href="/shop/department-homeware-productaffiliation-bedding/category-bedsets-category-duvetcover"
            class="search-quick-link"
            >Link 2</a
          >
          <a
            href="/shop/department-homeware-productaffiliation-duvetsandpillows/category-protectors"
            class="search-quick-link"
            >Link 3</a
          >
          <a href="/shop/department-homeware-productaffiliation-duvetsandpillows/category-toppers" class="search-quick-link"
            >Link 4</a
          >
          <a
            href="/shop/department-homeware-productaffiliation-bedding/category-bedsets-category-duvetcover"
            class="search-quick-link"
            >Link 5</a
          >
          <a
            href="/shop/department-homeware-productaffiliation-bedding/category-bedsets-category-duvetcover"
            class="search-quick-link"
            >Link 6</a
          >
          <a
            href="/shop/department-homeware-productaffiliation-duvetsandpillows/category-protectors"
            class="search-quick-link"
            >Link 7</a
          >
          <a href="/shop/department-homeware-productaffiliation-duvetsandpillows/category-toppers" class="search-quick-link"
            >Link 8</a
          >
          <a
            href="/shop/department-homeware-productaffiliation-bedding/category-bedsets-category-duvetcover"
            class="search-quick-link"
            >Link 1</a
          >
          <a
            href="/shop/department-homeware-productaffiliation-bedding/category-bedsets-category-duvetcover"
            class="search-quick-link"
            >Link 2</a
          >
          <a
            href="/shop/department-homeware-productaffiliation-duvetsandpillows/category-protectors"
            class="search-quick-link"
            >Link 3</a
          >
        </div>
      </div>
    </div>
</div>
  `

    afterEach(() => {
        cleanup()
    })

    it("should match the snapshot ", () => {
        const {asFragment} = render(componentToTest)
        expect(asFragment()).toMatchSnapshot()

        expect(screen.queryByTestId("search-banner-mobile-read-more-content")).toBeInTheDocument()
    })

    it("When clicking the chevron, it should open it", () => {
        const {asFragment} = render(componentToTest)
        fireEvent.click(screen.getByTestId(/plp-search-banner-chevron/i))
        expect(asFragment()).toMatchSnapshot()
    })

    it("When clicking the chevron twice, it should close it", () => {
        const {asFragment} = render(componentToTest)
        fireEvent.click(screen.getByTestId(/plp-search-banner-chevron/i))
        fireEvent.click(screen.getByTestId(/plp-search-banner-chevron/i))
        expect(asFragment()).toMatchSnapshot()
    })
})
