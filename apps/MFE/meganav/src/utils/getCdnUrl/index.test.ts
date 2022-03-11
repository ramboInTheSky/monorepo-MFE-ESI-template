import env from "../../config/env"
import {formatCdnPath} from "."

describe("Format Cdn path", () => {
    it("Should have cdn base url", () => {
        const url = "/sample"
        expect(formatCdnPath(url)).toEqual(`${env.REACT_APP_BLOB_STORAGE_PATH}${url}`)
    })
})
