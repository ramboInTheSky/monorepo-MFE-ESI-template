import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
export interface ProductImpressionsContractModel {
    event: string;
    data: any;
}
export declare class ProductSummaryToDataLayer extends CommonESB implements ESB {
    publish(data: ProductImpressionsContractModel): void;
    subscribe(callback: (data: ProductImpressionsContractModel) => void): SubscribeToEvent;
}
