import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
export declare class ClearVisitorToken extends CommonESB implements ESB {
    publish(): void;
    subscribe(callback: () => void): SubscribeToEvent;
}
