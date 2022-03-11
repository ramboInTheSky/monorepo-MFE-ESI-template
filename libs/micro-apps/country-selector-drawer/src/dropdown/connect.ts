import {connect} from "react-redux"
import {changeCountry, State} from "../ducks"

export const mapStateToProps = (state: State, ownProps) => {
    const {territory, textAlignment, cdnBaseUrl} = ownProps
    const {countriesList, selectedCountry} = state

    return {
        countriesList,
        textAlignment,
        cdnBaseUrl,
        territory: territory?.toUpperCase(),
        selectedCountry,
    }
}

export const mapDispatchToProps = (dispatch: any) => ({
    selectCountry: (countryCode: string) => dispatch(changeCountry(countryCode)),
})

export default connect(mapStateToProps, mapDispatchToProps)
