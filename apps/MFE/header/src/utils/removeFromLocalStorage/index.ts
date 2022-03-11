import {LOCAL_STORAGE_ACTIVE_DEPT_NAME} from "../../config/constants"

const addToLocalStorage = (target, department) => {
    localStorage.setItem(LOCAL_STORAGE_ACTIVE_DEPT_NAME, JSON.stringify({path: target, dept: department}))
}

const removeFromLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_ACTIVE_DEPT_NAME)
}

export {addToLocalStorage, removeFromLocalStorage}
