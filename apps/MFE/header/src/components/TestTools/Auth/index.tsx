/* istanbul ignore file */
import React from "react"
import {State} from "ducks"
import {connect} from "react-redux"

const btnStyle = {width: "50%"}

const style: React.CSSProperties = {
    border: "3px solid white",
    right: 0,
    margin: 0,
    padding: 0,
}

const Auth = ({bag, itemCount}) => {
    const handleLogin = () => {
        ;(window as any).subjects["$ SHOPPING_BAG_GET_CALLBACK"].next({
            success: true,
            data: {ShoppingBag: {...bag, FirstName: "testaccouant", ItemCount: itemCount}},
        })
    }
    const handleLogout = () => {
        ;(window as any).subjects["$ SHOPPING_BAG_GET_CALLBACK"].next({
            success: true,
            data: {ShoppingBag: {...bag, FirstName: null, ItemCount: itemCount}},
        })
    }
    return (
        <div style={style}>
            <button type="button" style={btnStyle} onClick={handleLogin}>
                login
            </button>
            <button type="button" style={btnStyle} onClick={handleLogout}>
                logout
            </button>
        </div>
    )
}
const mapStateToProps = (state: State) => {
    return {itemCount: state.shoppingBag.itemCount, bag: state.shoppingBag.bag}
}
export default connect(mapStateToProps)(Auth)
