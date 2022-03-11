import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import {State} from "../ducks"

export const mockState: State = {
    showCountrySelector: false,
    countriesList: null,
    selectedCountry: null,
    selectedLanguage: null,
    defaultCountryCode: null,
    showOverlay: true,
    showBFPOFlag: false,
    loaded: false,
}

const mockConfigureStore = configureMockStore([thunk])
const mockStore = mockConfigureStore(mockState)

export default mockStore
