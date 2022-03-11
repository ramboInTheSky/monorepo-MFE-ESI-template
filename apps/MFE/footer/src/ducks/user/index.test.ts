import { Store } from "redux"
import reducer, { SET_USER, updateUserStatus } from "."

const mockStoreDispatch = jest.fn()
const store = ({ dispatch: mockStoreDispatch } as unknown) as Store

const initialState = { accountFirstName: "", loggedIn: false }
const mockUser = "Clark Kent"

describe("reducers: user", () => {
  describe("When called initially with no store", () => {
    it(`should return the initial state`, () => {
      expect(
        reducer(undefined, {
          type: "TEST" as any,
          user: { accountFirstName: '', loggedIn: false }
        })
      ).toEqual({
        ...initialState
      })
    })
  })

  describe("When called with an action to ignore", () => {
    it(`should return the initial state`, () => {
      expect(
        reducer(initialState, {
          type: "TEST" as any,
          user: { accountFirstName: '', loggedIn: false }
        })
      ).toEqual({
        ...initialState
      })
    })
  })

  describe("When called with SET_USER", () => {
    const expectedState = { accountFirstName: mockUser, loggedIn: true }
    it(`should update the state`, () => {
      expect(
        reducer(initialState, {
          type: SET_USER,
          user: { accountFirstName: mockUser, loggedIn: true }
        })
      ).toEqual({
        ...expectedState
      })
    })
  })
})

describe("Store: Helpers: updateUserStatus() - ", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe("When a user name is provided", () => {
    it("should set the redux store as logged in", () => {
      updateUserStatus(store, mockUser)
      expect(mockStoreDispatch).toHaveBeenCalled()
      expect(mockStoreDispatch).toHaveBeenCalledWith({
        type: SET_USER,
        user: { accountFirstName: mockUser, loggedIn: true }
      })
    })
  })
})
