import {BR_UID_2, BR_MT_SEARCH, BR_UID_DEFAULT_VALUE} from "../../config/constants"

const getBloomreachCookies = (request: any) => {
  const bloomreachCookies = {
    brUid2: "",
    brMtSearch: ""
  }
  if (request?.cookies && request?.cookies[BR_UID_2]) {
    bloomreachCookies.brUid2 = request.cookies[BR_UID_2]
  } else {
    bloomreachCookies.brUid2 = BR_UID_DEFAULT_VALUE
  }
  if (request?.cookies && request?.cookies[BR_MT_SEARCH]) {
    bloomreachCookies.brMtSearch = request.cookies[BR_MT_SEARCH]
  } else {
    bloomreachCookies.brMtSearch = ""
  }

  return bloomreachCookies
}

export default getBloomreachCookies
