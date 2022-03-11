import {connect} from "react-redux"
import State from "../../ducks/state"
import {setActivity} from "../../ducks/accordion-activity"

export const mapStateToProps = (state: State, props) => {
    const department = state.primarynav.activeDepartment
    const key = `${department}-${props.title}`
    const {isImagePlaceholderEnabled} = state.secondarynav
    return {
        isImagePlaceholderEnabled,
        opened: state.accordionActivity[key] || false,
        text: { chevronIconAltText : state.text.chevronIconAltText}
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        setOpened: (title: string | null) => {
            dispatch(setActivity(title))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
