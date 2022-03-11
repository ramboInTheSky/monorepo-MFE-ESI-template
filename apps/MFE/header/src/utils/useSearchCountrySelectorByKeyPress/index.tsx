import {useState} from "react"
import {Country as CountryType} from "../../models/countryselector"
import {COUNTRY_SELECTOR_TYPING_DELAY_TIME} from "../../config/constants"

export const useSearchCountrySelectorByKeyPress = (countriesList: CountryType[] | null, selectCountry: Function) => {
    const [typedKeys, setTypedKeys] = useState([])

    let timerId: any = 0
    const onKeyPress = key => {
        if (countriesList) {
            const letters: string[] = typedKeys
            letters.push(key)
            let filteredCountry
            if (letters.length > 0) {
                filteredCountry = countriesList?.find(
                    c => c.Country.slice(0, letters.length).toLowerCase() === letters.join(""),
                )
                if (filteredCountry) {
                    selectCountry(filteredCountry?.CountryCode)
                    timerId = setTimeout(() => {
                        setTypedKeys([])
                        clearTimeout(timerId)
                    }, COUNTRY_SELECTOR_TYPING_DELAY_TIME)
                } else {
                    setTypedKeys([])
                }
            }
        }
    }

    return {onKeyPress}
}
