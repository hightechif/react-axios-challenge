import axios from 'axios';

export const login = async (username, password) => {
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
    return service
}
