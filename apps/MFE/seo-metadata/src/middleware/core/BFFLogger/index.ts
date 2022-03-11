import Logger from "@monorepo/core-logger"
import {defaultClient} from "applicationinsights"

export const BFFLogger = {
    warn: (msg: string) => {
        if (defaultClient) defaultClient.trackTrace({message: msg, severity: 2})
        Logger.warn(msg)
    },
    error: (err: any) => {
        if (defaultClient) defaultClient.trackException({exception: new Error(err)})
        Logger.error(err)
    },
}

export default BFFLogger
