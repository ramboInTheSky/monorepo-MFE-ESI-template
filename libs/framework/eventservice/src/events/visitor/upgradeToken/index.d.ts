import { VisitorTokenUpgradeContractModel } from "..";
import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
export declare class UpgradeVisitorToken extends CommonESB implements ESB {
    publish(data: any): void;
    subscribe(callback: (data: VisitorTokenUpgradeContractModel) => void): SubscribeToEvent;
}
