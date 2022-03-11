/* eslint-disable class-methods-use-this */
import Events from "../.."
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"

export interface ProductImpressionsContractModel {
  event: string
  data: any
}

export class ProductSummaryToDataLayer extends CommonESB implements ESB {
    public publish(data: ProductImpressionsContractModel) {
      super.PublishData(Events.PRODUCT_SUMMARY_DEBOUNCE_TO_DATALAYER, data)
    }
    
    public subscribe(callback: (data: ProductImpressionsContractModel) => void): SubscribeToEvent {
      return super.SubscribeToEvent(Events.PRODUCT_SUMMARY_DEBOUNCE_TO_DATALAYER, callback)
  }
}