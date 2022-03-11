import {connect} from "react-redux"
import {State} from "../../ducks"

export const mapStateToProps = (state: State) => {
    const {countrySelector, text: {countryChangeModal}} = state
    
    return {
        selectedCountry: countrySelector.selectedCountry,
        selectedLanguage: countrySelector.selectedLanguage,
        text: countryChangeModal
    }
}

export default connect(mapStateToProps)
