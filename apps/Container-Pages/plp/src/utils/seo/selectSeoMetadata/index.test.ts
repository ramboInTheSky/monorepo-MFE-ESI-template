import State from "../../../models/State"
import seoMetadataConfig from "../../../config/seoMetadata.json"
import {selectSeoMetadata} from "."
import {selectSeoMetadataArgs} from "../selectSeoMetadataArgs"
import {getSeoMetadataFromConfig, KEYWORD_SEARCH} from "../getSeoMetadataFromConfig"
import {replaceSeoMetadataPlaceholders} from "../replaceSeoMetadataPlaceholders"

jest.mock("../selectSeoMetadataArgs")
jest.mock("../getSeoMetadataFromConfig")
jest.mock("../replaceSeoMetadataPlaceholders")

type MetadataArgs = Partial<ReturnType<typeof getSeoMetadataFromConfig>>

function mockSelectSeoMetadataArgs(args: MetadataArgs = {}) {
    ;(selectSeoMetadataArgs as jest.Mock).mockReturnValue(args)
}

function mockGetSeoMetadataFromConfig(result: any) {
    ;(getSeoMetadataFromConfig as jest.Mock).mockReturnValue(result)
}

function mockReplaceSeoMetadataPlaceholders(result: any) {
    ;(replaceSeoMetadataPlaceholders as jest.Mock).mockReturnValue(result)
}

describe("Given `selectSeoMetadata`", () => {
    const state = {} as State
    const expectedResult = "Foo"
    const expectedSeoMetadata = {title: "foo"}
    const expectedMetadataArgs = {
        realm: "amido",
        territory: "gb",
        searchTerm: "red",
        market: "UK",
        searchType: KEYWORD_SEARCH,
        filters: [],
        withFilters: false,
    }

    beforeEach(() => {
        mockSelectSeoMetadataArgs(expectedMetadataArgs)
        mockGetSeoMetadataFromConfig(expectedSeoMetadata)
        mockReplaceSeoMetadataPlaceholders(expectedResult)
    })
    it("should return the seo metadata with placeholders replaced", () => {
        const result = selectSeoMetadata(state)
        expect(result).toBe(expectedResult)
        expect(selectSeoMetadataArgs).toHaveBeenCalledWith(state)
        expect(getSeoMetadataFromConfig).toHaveBeenCalledWith({
            realm: expectedMetadataArgs.realm,
            territory: expectedMetadataArgs.territory,
            searchType: expectedMetadataArgs.searchType,
            withFilters: expectedMetadataArgs.withFilters,
            config: seoMetadataConfig,
        })
        expect(replaceSeoMetadataPlaceholders).toHaveBeenCalledWith(expectedSeoMetadata, {
            searchTerm: expectedMetadataArgs.searchTerm,
            filters: expectedMetadataArgs.filters,
            market: expectedMetadataArgs.market,
        })
    })
})
