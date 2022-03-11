/* istanbul ignore file */
import React, {useState} from "react"

const btnStyle = {width: "50%"}

const style: React.CSSProperties = {
    border: "3px solid white",
    right: 0,
    margin: 0,
    padding: 0,
    display: "flex",
}

const CountrySelector = () => {
    const [countryCode, setCountryCode] = useState("MX")

    const handleOpen = () => {
        ;(window as any).subjects["$ COUNTRY_SELECTOR_OPEN"].next({
            isoCountryCode: countryCode,
        })
    }
    return (
        <div style={style}>
            <button type="button" style={btnStyle} onClick={handleOpen}>
                Open Country
            </button>
            <input value={countryCode} onChange={e => setCountryCode(e.target.value)} />
        </div>
    )
}

export default CountrySelector
