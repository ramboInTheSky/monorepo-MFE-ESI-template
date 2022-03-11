import {AddProductsToMonetate} from "@monorepo/eventservice"

const AddProductsToMonetateEvent = new AddProductsToMonetate()

const publishProductNumbersToMonetate = (items: string[]) => {
    AddProductsToMonetateEvent.publish({
        success: true,
        data: items
    })
}

export default publishProductNumbersToMonetate
