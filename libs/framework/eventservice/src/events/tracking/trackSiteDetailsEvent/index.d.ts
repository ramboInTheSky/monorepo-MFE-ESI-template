import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
export interface TrackSiteDetailsEventContractModel {
    data: any;
}
export declare class TrackSiteDetailsEvent extends CommonESB implements ESB {
    publish(data: TrackSiteDetailsEventContractModel): void;
    subscribe(callback: (data: TrackSiteDetailsEventContractModel) => void): SubscribeToEvent;
}
