import {Fits, LowercaseFits} from "../../config/constants"

const fitReducer = (acc, eachFit: string) => {
    if (eachFit && typeof eachFit === 'string') {
        const lowercaseFit = eachFit.toLowerCase()

        if (lowercaseFit.includes(LowercaseFits.petite)) {
            return [...acc, Fits.Petite]
        }
        if (lowercaseFit.includes(LowercaseFits.tall)) {
            return [...acc, Fits.Tall]
        }
    }

    return acc
}

const FilterFits = (fits?: string[]): Fits[] => {
    if (!fits || fits.length === 0) return []
    return fits?.reduce(fitReducer, []).sort()
}

export default FilterFits
