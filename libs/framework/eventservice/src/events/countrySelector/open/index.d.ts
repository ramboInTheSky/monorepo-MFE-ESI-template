import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
export interface CountrySelectorOpenContractModel {
    isoCountryCode: string;
}
export declare class CountrySelectorOpenESB extends CommonESB implements ESB {
    publish(data: CountrySelectorOpenContractModel): void;
    subscribe(callback: (data: CountrySelectorOpenContractModel) => void): SubscribeToEvent;
}
