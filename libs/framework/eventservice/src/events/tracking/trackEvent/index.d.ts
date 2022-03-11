import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
export interface TrackEventContractModel {
    event: string;
    data: any;
}
export declare class TrackEvent extends CommonESB implements ESB {
    publish(data: TrackEventContractModel): void;
    subscribe(callback: (data: TrackEventContractModel) => void): SubscribeToEvent;
}
