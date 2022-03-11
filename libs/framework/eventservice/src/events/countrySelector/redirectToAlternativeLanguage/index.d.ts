import { CommonESB, SubscribeToEvent, ESB } from "../../../esb";
export declare class CountrySelectorRedirectToAlternativeLanguageESB extends CommonESB implements ESB {
    publish(): void;
    subscribe(callback: () => void): SubscribeToEvent;
}
