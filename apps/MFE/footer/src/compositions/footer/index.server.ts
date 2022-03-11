import {Store} from "redux"
import {getFooterDataThunk as getFooterData} from "../../ducks/footerdata"
import BFFLogger from "../../server/core/BFFLogger"

export const getServerSideProps = async (_req: any, _res: any, store: Store) => {
    try {
        await getFooterData(store)
        return {}
    } catch (err) {
        BFFLogger.error(err)
        return {}
    }
}

export default getServerSideProps