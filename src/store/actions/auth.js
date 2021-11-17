import axios from 'axios';

const init = async () => {
    const service = await axios({
        method: 'get',
        baseURL: 'https://fadhil-auth.herokuapp.com',
        url: '/api/v1',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return service;
}

const register = async (username, password) => {
    const service = await axios({
        method: 'post',
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
    return service;
}

const login = async (username, password) => {
    const service = await axios({
        method: 'post',
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
    return service;
}

const auth = {
    init,
    register,
    login
}

export default auth;
