export const SET_ACTIVE = "SET_ACTIVE"

export type TabsActivityDuckState = {
    [department: string]: number
}

export interface Action {
    type: typeof SET_ACTIVE
    payload: TabsActivityDuckState
}

export const initialState: TabsActivityDuckState = {}

export const setActiveTab = (tabIndex: number) => (dispatch, getState) => {
    const department = getState().primarynav.activeDepartment
    const payload = {[department]: tabIndex}
    dispatch({type: SET_ACTIVE, payload})
}

const reducer = (state: TabsActivityDuckState = initialState, action: Action): TabsActivityDuckState => {
    switch (action.type) {
        case SET_ACTIVE: {
            return {...state, ...action.payload}
        }
        default:
            return state
    }
}

export default reducer
