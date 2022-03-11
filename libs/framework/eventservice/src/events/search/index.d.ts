import { CommonESB, SubscribeToEvent, ESB } from "../../esb";
export interface SearchContractModel {
    id: string;
    name: string;
}
export declare class SearchESB extends CommonESB implements ESB {
    publish(data: SearchContractModel): void;
    subscribe(callback: (data: SearchContractModel) => void): SubscribeToEvent;
}
