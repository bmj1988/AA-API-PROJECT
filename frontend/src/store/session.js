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
        const err = loginResponse
        throw err
    }
}

export const thunkRestoreUser = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/session`)
        if (response.ok) {
            const userInfo = await response.json();
            await dispatch(setUser(userInfo));
            return userInfo
        }
        else {
            throw response
        }
    }
    catch (responseError) {
        const error = await responseError.json()
        return error
    }
}

export const thunkCreateUser = (newUserInfo) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserInfo)
        })

        if (response.ok) {
            const userInfo = await response.json();
            await dispatch(setUser(userInfo));
            return userInfo
        }
        else {
            throw response
        }
    }
    catch (e) {
        const error = e.json();
        return error
    }
}

export const thunkLogout = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/session`, {
            method: 'DELETE',
        })
        if (response.ok) {
            const deleteOk = await response.json();
            await dispatch(removeUser())
            return deleteOk
        }
        else {
            throw response
        }
    }
    catch (e) {
        const error = await e.json();
        return error
    }
}

const sessionReducer = (state = { user: null }, action) => {
    let sessionState = { ...state }
    switch (action.type) {
        case SETUSER: {
            if (action.user.user === null) {
                sessionState = {user: null}
                return sessionState
            }
            sessionState.user = { ...action.user.user };
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
