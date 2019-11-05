import axios from "axios";
import {
    GET_TODOS,
    DELETE_TODO,
    ADD_TODO,
    GET_TODO
} from "./types";
import {
    __notify__,
    sendNotification
} from '../utility/Helper'

export const getTodos = () => (dispatch, getState) => {
    axios
        .get("/api/todos/")
        .then(res => {
            dispatch({
                type: GET_TODOS,
                payload: res.data
            });
        })
        .catch(err => {
            if (err.response.data) {
                __notify__(err.response.data);
            }
        });
};


export const deleteTodo = id => (dispatch, getState) => {
    axios
        .delete(`/api/todos/${id}/`)
        .then(res => {
            sendNotification('Todo Deleted')
            dispatch({
                type: DELETE_TODO,
                payload: id
            });
        })
        .catch(err => console.log(err));
};

export const getTodoById = id => (dispatch, getState) => {
    axios
        .get(`/api/todos/${id}/`)
        .then(res => {
            dispatch({
                type: GET_TODO,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

export const addTodo = todo => (dispatch, getState) => {
    axios
        .post("/api/todos/", todo)
        .then(res => {
            sendNotification('Todo Added')
            dispatch({
                type: ADD_TODO,
                payload: res.data
            });
        })
        .catch(err => {
            if (err.response.data) {
                __notify__(err.response.data);
            }
        });
};


export const updateTodo = (todo,history) => (dispatch, getState) => {
    axios
        .patch(`/api/todos/${todo.id}/`, todo)
        .then(res => {
            sendNotification('Todo Updated')
            history.push('/')
        })
        .catch(err => {
            if (err.response.data) {
                __notify__(err.response.data);
            }
        });
};

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