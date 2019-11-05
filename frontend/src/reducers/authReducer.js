import {
    SET_CURRENT_USER,
    LOGIN_SUCCESS,
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL
} from '../actions/types'
import isEmpty from '../validation/isEmpty'
const initialState = {
    isAuthenticated: false,
    user: {},
    isLoading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
            case USER_LOADED:
                return {
                    ...state,
                    isAuthenticated: true,
                        isLoading: false,
                        user: action.payload
                };
            case SET_CURRENT_USER:
                return {
                    ...state,
                    isAuthenticated: !isEmpty(action.payload),
                        user: action.payload
                }
                case LOGIN_SUCCESS:
                    return {
                        ...state,
                        ...action.payload,
                            isAuthenticated: true,
                            isLoading: false
                    }
                    case AUTH_ERROR:
                    case LOGIN_FAIL:
                    case LOGOUT_SUCCESS:
                    case REGISTER_FAIL:
                              localStorage.removeItem("Token");
                              return {
                                ...state,
                                user: null,
                                isAuthenticated: false,
                                isLoading: false
                              };
                default:
                    return state
    }
}