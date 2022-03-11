import {REALM_HEADER} from "../../../config/constants"
import {mockState} from "../../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Given connect - mapStateToProps()", () => {
    it("should return the correct state", () => {
        const mockedRequest: any = {headers: {[REALM_HEADER]: "amido"}}
        expect(mapStateToProps({...mockState, request: mockedRequest})).toEqual({
            currentLanguageText: mockState?.languages?.currentLanguageText,
            altLangaugeName: mockState?.languages?.altLanguageName,
            altLanguageUrl: mockState?.languages?.altLanguageUrl,
            currentLanguageName: mockState?.languages?.currentLanguageName,
            siteUrl: mockState?.languages?.siteUrl,
            variant: mockState.settings.variant,
            realm: "amido",
        })
    })
})
