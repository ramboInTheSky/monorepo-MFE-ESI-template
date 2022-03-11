/* eslint-disable */
import {addToLocalStorage, removeFromLocalStorage} from "."
import {LOCAL_STORAGE_ACTIVE_DEPT_NAME} from "../../config/constants"

describe("Format Cdn path", () => {
    beforeEach(() => {
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => null),
                removeItem: jest.fn(() => null),
            },
            writable: true,
        })
    })
    it("Should add path and dept to local storage", async () => {
        const target = "/sample"
        const department = "testing-dept"
        await addToLocalStorage(target, department)
        expect(window.localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(window.localStorage.setItem).toHaveBeenCalledWith(
            LOCAL_STORAGE_ACTIVE_DEPT_NAME,
            '{"path":"/sample","dept":"testing-dept"}',
        )
    })
    it("Should delete NextMobileUrlDeptDictionary item from local storage", async () => {
        const target = "/sample"
        const department = "testing-dept"
        await addToLocalStorage(target, department)
        await removeFromLocalStorage()
        expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1)
        expect(window.localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_ACTIVE_DEPT_NAME)
        expect(window.localStorage.getItem(LOCAL_STORAGE_ACTIVE_DEPT_NAME)).toBe(null)
    })
})
