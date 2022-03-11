import { Subscription } from "rxjs";
import Events from "./events";
declare class Emitter {
    private static instance;
    static get Instance(): Emitter;
    private createName;
    emit(name: Events, data: any): void;
    listen(name: Events, handler: any): Subscription;
    dispose(): void;
}
declare const _default: Emitter;
export default _default;
