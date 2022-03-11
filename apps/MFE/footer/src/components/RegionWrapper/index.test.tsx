import React from "react"
import {render, cleanup} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"

import {SupportedRegionTypes} from "../../models/regions"
import RegionWrapper from "."

describe("Common/RegionWrapper: ", () => {
    afterEach(() => {
        cleanup()
    })
    describe(`when region type is ${SupportedRegionTypes.SocialMedia}`, () => {
        it(`should show the regionWrapper with hello world and HR element`, () => {
            const props = {
                regionType: SupportedRegionTypes.SocialMedia,
                isInternationalCountry: false,
            }

            const {asFragment, getByText} = render(
                <SCThemeProvider theme={mockTheme}>
                    <RegionWrapper {...props}>
                        <h1>Hello World</h1>
                    </RegionWrapper>
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
            expect(getByText("Hello World")).toBeTruthy()
        })
    })
    describe(`when region type is ${SupportedRegionTypes.Copyright}`, () => {
        const props = {
            regionType: SupportedRegionTypes.Copyright,
            isInternationalCountry: true,
        }

        it(`should show the regionWrapper with hello world`, () => {
            const {asFragment, getByText} = render(
                <SCThemeProvider theme={mockTheme}>
                    <RegionWrapper {...props}>
                        <h1>Hello World</h1>
                    </RegionWrapper>
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
            expect(getByText("Hello World")).toBeTruthy()
        })
    })
})
