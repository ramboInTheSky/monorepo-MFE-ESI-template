import {connect} from "react-redux"
import State from "../../ducks/state"
import {changeCountry} from "../../ducks/country-selector"
import {TERRITORY_HEADER} from "../../config/constants"

export const mapStateToProps = (state: State) => {
    const territory = state.request?.headers![TERRITORY_HEADER] as string
    const {textAlignment} = state
    const {countriesList, selectedCountry} = state.countrySelector

    return {
        countriesList,
        textAlignment,
        territory: territory.toUpperCase(),
        selectedCountry,
    }
}

export const mapDispatchToProps = (dispatch: any) => ({
    selectCountry: (countryCode: string) => dispatch(changeCountry(countryCode)),
})

export default connect(mapStateToProps, mapDispatchToProps)
