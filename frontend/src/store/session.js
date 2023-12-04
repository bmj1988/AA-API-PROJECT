import { csrfFetch } from "./crsf"
const SETUSER = 'session/SETUSER'
const REMOVE_USER = 'session/REMOVEUSER'

const setUser = (user) => {
    return {
        type: SETUSER,
        user,
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const thunkLogin = (credentials) => async (dispatch) => {
    const loginResponse = await csrfFetch(`/api/session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })
    if (loginResponse.ok) {
        const userInfo = await loginResponse.json();
        dispatch(setUser(userInfo));
        return userInfo
    }
    else {
        const err = await loginResponse.json();
        throw err
    }
}


const sessionReducer = (state = {user: null}, action) => {
    const sessionState = {...state}
    switch (action.type) {
        case SETUSER: {
            sessionState.user = action.user;
            return sessionState
        }
        case REMOVE_USER: {
            sessionState.user = null
            return sessionState
        }
        default: return sessionState
    }
}

export default sessionReducer;
