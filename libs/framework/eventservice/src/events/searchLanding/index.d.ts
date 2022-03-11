import { CommonESB, SubscribeToEvent, ESB } from "../../esb";
export interface SearchLandingContractModel {
    data: any;
}
export declare class PageLandingESB extends CommonESB implements ESB {
    publish(data: SearchLandingContractModel): void;
    subscribe(callback: (data: SearchLandingContractModel) => void): SubscribeToEvent;
}
