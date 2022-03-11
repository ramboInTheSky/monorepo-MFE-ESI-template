import {SettingsSdkKeys} from "../../models/settings"
import {getItemsPerPage} from "."

describe("Utils: getItemsPerPage() - ", () => {
    describe("getItemsPerPage() - ", () => {
        describe("When Settings SDK has no data", () => {
            const configuration = null
            it("should throw an error when settings SDK had missing data", () => {
                expect(() => getItemsPerPage(configuration)).toThrowError()
            })
        })
        describe("When SDK `ItemsPerPage` is undefined", () => {
            const configuration = {
                [SettingsSdkKeys.ItemsPerPage]: null,
            }
            it("should throw an error", () => {
                expect(() => getItemsPerPage(configuration)).toThrowError()
            })
        })
        describe("When SDK `ItemsPerPage initial` is undefined", () => {
            const configuration = {
                [SettingsSdkKeys.ItemsPerPage]: {
                    subsequent: {
                        mobile: 8,
                        tablet: 12,
                        desktop: 24,
                    },
                    initial: null,
                } as any,
            }
            it("should throw an error", () => {
                expect(() => getItemsPerPage(configuration)).toThrowError()
            })
        })
        describe("When SDK `ItemsPerPage subsequent` is undefined", () => {
            const configuration = {
                [SettingsSdkKeys.ItemsPerPage]: {
                    subsequent: null,
                    initial: {
                        mobile: 8,
                        tablet: 12,
                        desktop: 24,
                    },
                } as any,
            }
            it("should throw an error", () => {
                expect(() => getItemsPerPage(configuration)).toThrowError()
            })
        })
        describe("When SDK `ItemsPerPage` is set", () => {
            const data = {
                initial: {
                    mobile: 8,
                    tablet: 12,
                    desktop: 24,
                },
                subsequent: {
                    mobile: 8,
                    tablet: 12,
                    desktop: 24,
                },
            }
            const configuration = {
                [SettingsSdkKeys.ItemsPerPage]: data,
            }
            it("should return the itemsPerPage data", () => {
                expect(getItemsPerPage(configuration)).toBe(data)
            })
        })
    })
})
