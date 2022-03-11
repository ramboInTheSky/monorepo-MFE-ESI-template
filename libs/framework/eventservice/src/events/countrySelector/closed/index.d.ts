import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
export declare class CountrySelectorClosedESB extends CommonESB implements ESB {
    publish(): void;
    subscribe(callback: () => void): SubscribeToEvent;
}
