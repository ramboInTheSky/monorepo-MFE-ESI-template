import {ModalsCloseESB} from "@monorepo/eventservice"

const modalsCloseESB = new ModalsCloseESB()

export const PublishToModalsClosed = () => {
    modalsCloseESB.publish()
}

export default {PublishToModalsClosed}
