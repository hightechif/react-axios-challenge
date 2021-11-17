import axios from "axios"

const API_KEY = process.env.REACT_APP_API_KEY

export const example = async () => {
    const service = await axios({
            method: 'GET',
            baseURL: 'https://api.themoviedb.org',
            url: '/3/movie/550',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                api_key: API_KEY
            }
        })
    return service;
}

const getList = async (listID, page) => {
    const service = await axios({
        method: 'get',
        baseURL: 'https://api.themoviedb.org',
        url: `/4/list/${listID}`,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        params: {
            page: page,
            api_key: API_KEY
        }
    })
    return service;
}

const TMDB = {
    example,
    getList
}

export default TMDB;