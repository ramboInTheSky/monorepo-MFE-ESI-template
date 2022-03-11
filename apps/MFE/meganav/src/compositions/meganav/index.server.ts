import {Store} from "redux"
import {getPrimaryNavDataThunk as getPrimaryNavData} from "../../ducks/primary-nav"
import BFFLogger from "../../server/core/BFFLogger"

export const getServerSideProps = async (_req: any, _res: any, store: Store) => {
    try {
        await getPrimaryNavData(store)
        return {}
    } catch (err) {
        BFFLogger.error(err)
        return {}
    }
}

export default getServerSideProps
