import {SupportedRegionTypes, deviceSwitcherUtils, DeviceType, SupportedCopyrightTypes} from "."

describe("Models/regions - ", () => {
    describe("SupportedRegionTypes: ", () => {
        it("should match the SupportedRegionTypes", () => {
            expect(SupportedRegionTypes.SocialMedia).toMatchSnapshot()
            expect(SupportedRegionTypes.MainLinks).toMatchSnapshot()
            expect(SupportedRegionTypes.QuickLinks).toMatchSnapshot()
            expect(SupportedRegionTypes.Copyright).toMatchSnapshot()
        })
    })
    describe("deviceSwitcherUtils: ", () => {
        it("should match the RegionsModel", () => {
            expect(deviceSwitcherUtils).toMatchSnapshot()
        })
    })
    describe("DeviceType: ", () => {
        it("should match the RegionsModel", () => {
            expect(DeviceType).toMatchSnapshot()
        })
    })
    describe("SupportedCopyrightTypes: ", () => {
        it("should match the RegionsModel", () => {
            expect(SupportedCopyrightTypes).toMatchSnapshot()
        })
    })
})
