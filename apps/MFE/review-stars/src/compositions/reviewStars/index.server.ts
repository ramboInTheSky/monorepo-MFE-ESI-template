import {Store} from "redux"
import BFFLogger from "../../server/core/BFFLogger"
import {updateReviewStars} from "../../ducks/reviewStars"

interface GetServerSideResponse {
    isConfError: boolean
}

export const getServerSideProps = async (req: any, res: any, _store: Store): Promise<GetServerSideResponse> => {
    try {
        const {headers} = res.req

        await updateReviewStars(_store, {
            headers,
            itemNumber: req.params.itemNumber
        })
        return {isConfError: false}
    } catch (err) {
        BFFLogger.error(err)
        return {isConfError: true}
    }
}

export default getServerSideProps
