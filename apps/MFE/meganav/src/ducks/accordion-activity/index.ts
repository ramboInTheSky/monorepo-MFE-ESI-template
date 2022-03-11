export const SET_ACTIVE = "SET_ACTIVE"

export type AccordionActivityDuckState = {
    [title: string]: boolean
}

export interface Action {
    type: typeof SET_ACTIVE
    payload: AccordionActivityDuckState
}

export const initialState: AccordionActivityDuckState = {}

export const setActivity = (title: string | null) => (dispatch, getState) => {
    const department = getState().primarynav.activeDepartment
    const key = `${department}-${title}`
    const currentActivity = getState().accordionActivity[key] || false
    const payload = {[key]: !currentActivity}
    dispatch({type: SET_ACTIVE, payload})
}

const reducer = (state: AccordionActivityDuckState = initialState, action: Action): AccordionActivityDuckState => {
    switch (action.type) {
        case SET_ACTIVE: {
            return {...state, ...action.payload}
        }
        default:
            return state
    }
}

export default reducer
