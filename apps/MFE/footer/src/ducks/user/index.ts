import { Store } from 'redux'

export const SET_USER = 'SET_USER'

interface SetUser {
  type: typeof SET_USER;
  user: UserDuckState;
}

export interface AccountStatusChanged {
  (accountFirstName: string): SetUser;
}

export interface UserDuckState {
  accountFirstName: string;
  loggedIn: boolean;
}

const initialState: UserDuckState = { accountFirstName: '', loggedIn: false }

export const setUser = (user: UserDuckState): SetUser => ({
  type: SET_USER,
  user,
})

export const updateUserStatus = (store: Store, accountFirstName: string) => {
  store.dispatch(setUser({ accountFirstName, loggedIn: !!accountFirstName }))
}

const reducer = (
  state: UserDuckState = initialState,
  action: SetUser,
): UserDuckState => {
  switch (action.type) {
    case SET_USER:
      return { ...action.user }
    default:
      return state
  }
}

export default reducer
