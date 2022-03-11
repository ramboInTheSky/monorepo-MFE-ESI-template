import {Store} from "redux"
import {getHeaderDataThunk as getHeaderData} from "../../ducks/headerdata"
import BFFLogger from "../../server/core/BFFLogger"
import {SettingsSdkKeys} from "../../models/settings"

export const getServerSideProps = async (_req: any, _res: any, store: Store) => {
    try {
        const defaultHeaderVersion = _res.locals.configuration
            ? _res.locals.configuration[SettingsSdkKeys.defaultDataVersion]?.Value
            : "v1.0.0"
        await getHeaderData(store, defaultHeaderVersion)
        return {}
    } catch (err) {
        BFFLogger.error(err)
        return {}
    }
}
export default getServerSideProps
