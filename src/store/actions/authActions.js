import axios from 'axios';
import { AUTH_INIT, AUTH_REGISTER, AUTH_LOGIN, AUTH_FAIL } from './type';

const init = () => async (dispatch) => {
    try {
        const service = await axios({
            method: 'GET',
            baseURL: 'https://fadhil-auth.herokuapp.com',
            url: '/api/v1',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = service.data;
        dispatch({
            type: AUTH_INIT,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: AUTH_FAIL,
            payload: "Service unavailable"
        })
    }
}

const register = (username, password) => async (dispatch) => {
    try {
        const service = await axios({
            method: 'POST',
            baseURL: 'https://fadhil-auth.herokuapp.com',
            url: '/api/v1/auth/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "username": username,
                "password": password
            })
        })
        const data = service.data;
        dispatch({
            type: AUTH_REGISTER,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: AUTH_FAIL,
            payload: error.message
        })
    }
}

const login = (username, password) => async (dispatch) => {
    try {
        const service = await axios({
            method: 'POST',
            baseURL: 'https://fadhil-auth.herokuapp.com',
            url: '/api/v1/auth/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "username": username,
                "password": password
            })
        })
        const data = service.data;
        dispatch({
            type: AUTH_LOGIN,
            payload: data
        })
        window.location.reload()
    } catch (error) {
        dispatch({
            type: AUTH_FAIL,
            payload: error.message
        })
    }
}

const authActions = {
    init,
    register,
    login
}

export default authActions;
