import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
export declare class CountrySelectorRedirectESB extends CommonESB implements ESB {
    publish(): void;
    subscribe(callback: () => void): SubscribeToEvent;
}
