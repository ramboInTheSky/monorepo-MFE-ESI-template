import {VisitorTokenUpgradeContractModel} from ".."
import Events from "../.."
import {CommonESB, SubscribeToEvent, ESB} from "../../../esb"

export class UpgradeVisitorToken extends CommonESB implements ESB {
    public publish(data) {
        super.PublishData(Events.VISITOR_TOKEN_UPGRADE, data)
    }

    public subscribe(callback: (data: VisitorTokenUpgradeContractModel) => void): SubscribeToEvent {
        return super.SubscribeToEvent(Events.VISITOR_TOKEN_UPGRADE, callback)
    }
}