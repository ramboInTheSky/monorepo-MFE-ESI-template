import {HydrateProductSummaryESB} from "@monorepo/eventservice"

const hydrateProductSummaryESB = new HydrateProductSummaryESB()

export const publishProductSummaryHydrate = () => {
    hydrateProductSummaryESB.publish()
}
