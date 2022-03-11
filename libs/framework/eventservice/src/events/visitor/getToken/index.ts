import {VisitorTokenCallbackContractModel, VisitorTokenContractModel} from ".."
import Events from "../.."
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"

export class GetVisitorToken extends CommonESB implements ESB {
    public publish(data: VisitorTokenContractModel) {
        super.PublishData(Events.VISITOR_TOKEN_GET, data)
    }

    public subscribe(callback: (data: VisitorTokenContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.VISITOR_TOKEN_GET, callback)
    }
}

export type GetVisitorTokenCallbackContractModel = VisitorTokenCallbackContractModel
export class GetVisitorTokenCallback extends CommonESB implements ESB {
    public publish(data: GetVisitorTokenCallbackContractModel) {
        super.PublishData(Events.VISITOR_TOKEN_GET_CALLBACK, data)
    }

    public subscribe(callback: (data: GetVisitorTokenCallbackContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.VISITOR_TOKEN_GET_CALLBACK, callback)
    }
}

export class ClearVisitorTokenCallback extends CommonESB implements ESB {
    public publish() {
        super.PublishData(Events.VISITOR_TOKEN_CLEAR_CALLBACK)
    }

    public subscribe(callback: () => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.VISITOR_TOKEN_CLEAR_CALLBACK, callback)
    }
}