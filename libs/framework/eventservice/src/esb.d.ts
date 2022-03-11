import { Subscription } from "rxjs";
import Events from "./events";
export interface SubscribeToEvent {
    subscription: Subscription;
}
export interface ESB {
    publish(data: any): void;
    subscribe(callback: (data?: any) => void): SubscribeToEvent;
}
export declare abstract class CommonESB {
    private subscriptions;
    protected PublishData(event: Events, data?: any): void;
    protected SubscribeToEvent(event: Events, cb: (data?: any) => void): SubscribeToEvent;
    UnsubscribeAll(): void;
}
