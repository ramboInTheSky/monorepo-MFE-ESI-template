import {useCommonObservable} from "../useObservable"
import {ModalsCloseESB} from "../../events/modals/close"

export const useModalsCloseObservable = (callback: () => void) => {
    return useCommonObservable(new ModalsCloseESB(), callback)
}
