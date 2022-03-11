import { VisitorTokenCallbackContractModel, VisitorTokenContractModel } from "..";
import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
export declare class GetVisitorToken extends CommonESB implements ESB {
    publish(data: VisitorTokenContractModel): void;
    subscribe(callback: (data: VisitorTokenContractModel) => void): SubscribeToEvent;
}
export declare type GetVisitorTokenCallbackContractModel = VisitorTokenCallbackContractModel;
export declare class GetVisitorTokenCallback extends CommonESB implements ESB {
    publish(data: GetVisitorTokenCallbackContractModel): void;
    subscribe(callback: (data: GetVisitorTokenCallbackContractModel) => void): SubscribeToEvent;
}
export declare class ClearVisitorTokenCallback extends CommonESB implements ESB {
    publish(): void;
    subscribe(callback: () => void): SubscribeToEvent;
}
