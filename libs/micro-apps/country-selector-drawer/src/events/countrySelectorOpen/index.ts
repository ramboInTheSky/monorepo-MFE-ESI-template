import {CountrySelectorOpenESB, CountrySelectorOpenContractModel} from "@monorepo/eventservice"

const openESB = new CountrySelectorOpenESB()

const PublishCountrySelectorOpen = (data: CountrySelectorOpenContractModel) => {
    openESB.publish(data)
}
export default PublishCountrySelectorOpen
