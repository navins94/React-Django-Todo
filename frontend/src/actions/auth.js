import axios from "axios";
import {setAuthToken,sendNotification} from '../utility/Helper'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    SET_CURRENT_USER,
    GET_ERRORS,
    CLEAR_TODOS
} from "./types";
import {
    __notify__
} from '../utility/Helper'

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({
        type: USER_LOADING
    });

    if (localStorage.Token) {
        setAuthToken(localStorage.Token);
    }
    axios
        .get("/api/auth/user")
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: AUTH_ERROR
            });
        });
};

// LOGIN USER
export const login = data => dispatch => {
    axios
        .post("/api/auth/login", data)
        .then(res => {
            const token = res.data.token
            localStorage.setItem('Token', token)
            setAuthToken(token)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.user
            });
           
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// REGISTER USER
export const register = (data, history) => dispatch => {
    axios
        .post("/api/auth/register", data)
        .then(res => {
            sendNotification(res.data.message)
            history.push('/login')
        })
        .catch(err => {
            __notify__(err.response.data);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    axios
        .post("/api/auth/logout/")
        .then(res => {
            setAuthToken()
            dispatch({
                type: CLEAR_TODOS
            });
            dispatch({
                type: LOGOUT_SUCCESS
            });
        })
        .catch(err => {
            sendNotification(err.response.data)
        });
};

// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // If token, add to headers config
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
};