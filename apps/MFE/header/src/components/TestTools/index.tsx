// for testing purposes only
/* istanbul ignore file */

import React, {useState, CSSProperties} from "react"
import BagTriggers from "./BagTriggers"
import Auth from "./Auth"
import CountrySelector from "./countrySelector"

const style: CSSProperties = {position: "fixed", right: "0"}
const btnStyle: CSSProperties = {background: "red", border: "red", color: "white"}
const containerStyle: CSSProperties = {
    right: "1rem",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
}
const TestTools = () => {
    const [open, setState] = useState(false)
    return (
        <div style={style}>
            <button style={btnStyle} onClick={() => setState(!open)} type="button">
                T
            </button>
            {open && (
                <div style={containerStyle}>
                    <BagTriggers />
                    <Auth />
                    <CountrySelector />
                </div>
            )}
        </div>
    )
}

export default TestTools
