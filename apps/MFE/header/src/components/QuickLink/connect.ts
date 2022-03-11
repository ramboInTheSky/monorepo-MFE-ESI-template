import {connect} from "react-redux"
import {State} from "../../ducks"
import {DEFAULT_TEMPLATE, BURGER_MENU_TEMPLATE} from "../../config/constants"
import DefaultQuickLink from "./templates/default-template"
import BurgerMenuQuickLink from "./templates/burgermenu-template"

const components = {
    [DEFAULT_TEMPLATE]: DefaultQuickLink,
    [BURGER_MENU_TEMPLATE]: BurgerMenuQuickLink,
}

export const getComponent = (template: string) => components[template] ?? components[DEFAULT_TEMPLATE]

export const mapStateToProps = (state: State) => {
    const {template} = state
    const componentName = getComponent(template)
    return {
        componentName,
    }
}

export default connect(mapStateToProps)
