import {ProductType} from "../../config/constants"

const setFavouriteEnabled = (productType: string, isPersonalised: boolean) => {
    return productType === ProductType && isPersonalised
}

export default setFavouriteEnabled
