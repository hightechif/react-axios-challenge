import { AUTH_INIT, AUTH_REGISTER, AUTH_LOGIN, AUTH_FAIL } from '../actions/type';

const initialState = {
    message: "",
    accessToken: "",
    item: {},
    errorMessage: ""
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_INIT:
            return {
                ...state,
                message: action.payload.message,
                errorMessage: ""
            }
        case AUTH_REGISTER:
            return {
                ...state,
                item: action.payload,
                errorMessage: ""
            }
        case AUTH_LOGIN:
            localStorage.setItem('ACCESS_TOKEN', action.payload.token);
            return {
                ...state,
                accessToken: action.payload.token,
                errorMessage: ""
            }
        case AUTH_FAIL:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;