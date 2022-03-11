import {connect} from "react-redux"
import {FacetsState} from "../../models/FacetsState"
import {setFiltersAlphabetAction} from "../../ducks/viewAllModal"
import State from "../../models/State"
import {DIGIT_REGEX} from "../../config/constants"



export const mapStateToProps = (state: State) => ({
    facets: state.viewAllModal.facets,
    activeCharacter: state.viewAllModal.activeCharacter,
    text: state.text,
})

export const mergeProps = (state: any, {dispatch}: any, ownProps) => {
    const alphabet = state.text.pages.viewAllModal.alphabet.split(",")
    return {
    ...state,
    ...ownProps,
    alphabet,
    clickableCharacters: alphabet.filter(character =>
        Object.entries(state.facets as FacetsState).some(entry =>
            entry[1].n.toLowerCase().startsWith(character.toLowerCase()),
        ),
    ),
    clickableNumeric: Object.entries(state.facets as FacetsState).some(entry => DIGIT_REGEX.exec(entry[1].n)),

    handleSetFiltersAlphabet: (letter: string) => {
        dispatch(setFiltersAlphabetAction(letter))
    },
}}

export default connect(mapStateToProps, null as any, mergeProps)
