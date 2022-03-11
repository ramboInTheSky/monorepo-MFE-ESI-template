import morgan from "morgan"
import logger from "@monorepo/core-logger"

const morganInstance = (options?: object) => morgan("combined", {stream: logger.stream, ...options})

export const httpLogger = isDev =>
    isDev
        ? morganInstance({
              // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
              skip(_req: any, res: any) {
                  return res.statusCode < 400
              },
          })
        : morganInstance()
