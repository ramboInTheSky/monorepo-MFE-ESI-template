import {connect} from "react-redux"
import {DIGIT_REGEX} from "../../config/constants"
import {setFilterModal} from "../../ducks/viewAllModal"
import {FacetsAlphabetValues, FacetState} from "../../models/FacetsState"
import State from "../../models/State"
import deburr from "../../utils/deburr"
import TrackViewAllModalFilterSelect from "../../events/trackEvent/events/viewAllModalFilterSelect"
import TrackViewAllModalFilterDeselect from "../../events/trackEvent/events/viewAllModalFilterDeselect"

export const mapStateToProps = ({viewAllModal}: State) => {
    let facets: FacetState[]
    switch (viewAllModal.activeCharacter) {
        case FacetsAlphabetValues.Numeric: {
            facets = Object.values(viewAllModal.facets).filter(eachFacet => !!DIGIT_REGEX.exec(eachFacet.n))
            break
        }
        case FacetsAlphabetValues.All: {
            facets = Object.values(viewAllModal.facets)
            break
        }
        default: {
            facets = Object.values(viewAllModal.facets).filter(
                eachFacet =>
                    !!deburr(eachFacet.n)
                        .toLowerCase()
                        .startsWith(viewAllModal.activeCharacter.toLowerCase()),
            )
        }
    }

    return {
        facets,
    }
}

interface FacetsGridState {
    facets: FacetState[]
}

export const mergeProps = (state: FacetsGridState, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,

    handleSetFacet: (facetValue: string): void => {
        const facet = state.facets.find(f => f.v === facetValue)

        if (facet && facet.s) {
            TrackViewAllModalFilterDeselect(facetValue)
        } else {
            TrackViewAllModalFilterSelect(facetValue)
        }

        dispatch(setFilterModal(facetValue))
    },
})

export default connect(mapStateToProps, null, mergeProps)
