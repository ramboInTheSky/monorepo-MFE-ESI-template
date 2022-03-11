import {GetBagCallbackContractModel} from "@monorepo/eventservice"
import {Dispatch} from "redux"

export const SET_USER = "SET_USER"

interface SetUser {
    type: typeof SET_USER
    user: UserDuckState
}

export interface UserDuckState {
    firstName: string
    loggedIn: boolean
    userUpdated: boolean
}

const initialState: UserDuckState = {firstName: "", loggedIn: false, userUpdated: false}

export const setUser = (user: UserDuckState): SetUser => ({
    type: SET_USER,
    user,
})
export const updateUserStatus = (getBagData: GetBagCallbackContractModel) => (dispatch: Dispatch) => {
    if (getBagData.success) {
        const firstName = getBagData.data.ShoppingBag.FirstName
        dispatch(setUser({firstName: firstName ?? "", loggedIn: !!firstName, userUpdated: true}))
    } else {
        dispatch(setUser({firstName: "", loggedIn: false, userUpdated: true}))
    }
}

const reducer = (state: UserDuckState = initialState, action: SetUser): UserDuckState => {
    switch (action.type) {
        case SET_USER:
            return {...action.user}
        default:
            return state
    }
}

export default reducer
