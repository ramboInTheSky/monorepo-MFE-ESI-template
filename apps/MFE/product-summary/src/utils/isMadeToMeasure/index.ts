import {MADE_TO_MEASURE} from "../../config/constants"

const isMadeToMeasure = (personalisedType: string | undefined) => {
    return personalisedType === MADE_TO_MEASURE
}

export default isMadeToMeasure
