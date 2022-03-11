import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
export declare type publishProductSummaryTrackPageData = {
    itemNumber: string;
    index: number;
};
export interface ProductImpressionModel {
    event: string;
    data: publishProductSummaryTrackPageData[];
}
export declare class ProductSummaryTrackPage extends CommonESB implements ESB {
    publish(data: ProductImpressionModel): void;
    subscribe(callback: (data: ProductImpressionModel) => void): SubscribeToEvent;
}
