import {connect} from "react-redux"
import {State} from "../../ducks"
import {DEFAULT_TEMPLATE, BURGER_MENU_TEMPLATE} from "../../config/constants"
import {MiniShoppingBagDescription} from "./templates/default-template"
import {BurgerMenuMiniShoppingBagDescription} from "./templates/burgermenu-template"

const components = {
    [DEFAULT_TEMPLATE]: MiniShoppingBagDescription,
    [BURGER_MENU_TEMPLATE]: BurgerMenuMiniShoppingBagDescription,
}

export const getComponent = (template: string) => components[template] ?? components[DEFAULT_TEMPLATE]

export const mapStateToProps = (state: State) => {
    const {template} = state
    const ComponentName = getComponent(template)
    return {
        ComponentName,
    }
}

export default connect(mapStateToProps)
