import env from "../../config/env"
import {formatCdnPath, formatCdnPathWithVariant} from "."

describe("Format Cdn path", () => {
    it("should have cdn base url", () => {
        const url = "/sample"
        expect(formatCdnPath(url)).toEqual(`${env.REACT_APP_BLOB_STORAGE_PATH}${url}`)
    })
})

describe("Format Cdn path with variant", () => {
    describe("get brand variant path for amido", () => {
        it("should return path with variant and realm", () => {
            expect(
                formatCdnPathWithVariant("/icons/header/brand/amido/amido-white-logo.svg", "amido", "default"),
            ).toEqual(`${env.REACT_APP_BLOB_STORAGE_PATH}/icons/header/amido/default/amido-white-logo.svg`)
        })
    })

    describe("get quick link variant path for amido", () => {
        it("should return path with variant and realm", () => {
            expect(
                formatCdnPathWithVariant("/icons/header/quicklinks/amido/amido_my-account.svg", "amido", "default"),
            ).toEqual(`${env.REACT_APP_BLOB_STORAGE_PATH}/icons/header/amido/default/amido_my-account.svg`)
        })
    })
})
