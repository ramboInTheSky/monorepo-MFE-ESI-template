import {ChargesAndIncentive} from "../../models/shoppingbag"

export const excludeIncentives = (incentives: ChargesAndIncentive[]) => {
    const exclusions = ["CMO", "CSR", "CTC"]

    return incentives.filter(x => !exclusions.includes(x.Type))
}

export default excludeIncentives
