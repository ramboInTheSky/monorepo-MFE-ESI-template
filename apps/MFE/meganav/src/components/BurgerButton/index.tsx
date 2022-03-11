import React from "react"
import urls from "../../config/urls"
import {Button} from "./component"

export const BurgerButton = () => {
    return (
        <Button aria-label="Mobile Menu Toggle" type="button">
            <img alt="burger icon" src={urls.burgerMenu.iconUrl} />
        </Button>
    )
}

export default BurgerButton
