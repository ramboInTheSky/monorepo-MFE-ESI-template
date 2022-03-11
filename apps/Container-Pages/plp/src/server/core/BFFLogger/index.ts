import Logger from "@monorepo/core-logger"
import {defaultClient} from "applicationinsights"

export const BFFLogger = {
    dependency: (msg: string, duration: number) => {
        if (defaultClient)
            defaultClient.trackDependency({
                target: msg,
                name: msg,
                data: "n/a",
                duration,
                resultCode: 0,
                success: true,
                dependencyTypeName: msg,
            })
        Logger.debug(`Dependency: ${msg}, duration:  ${duration}`)
    },
    warn: (msg: string) => {
        if (defaultClient) defaultClient.trackTrace({message: msg, severity: 2})
        Logger.warn(msg)
    },
    error: err => {
        if (defaultClient) defaultClient.trackException({exception: new Error(err)})
        Logger.error(err)
    },
}

export default BFFLogger
