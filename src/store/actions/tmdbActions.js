import axios from "axios";
import { FETCH_MOVIES, TMDB_FAIL, CHANGE_MOVIES } from "./type";

const API_KEY = process.env.REACT_APP_API_KEY;

const getList = (listID, page) => async (dispatch, prev) => {
    try {
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
        const { results, total_results } = service.data;
        let data = [ ...prev().tmdb.items, ...results ]
        dispatch({
            type: FETCH_MOVIES,
            payload: {
                data,
                total_results
            }
        })
    } catch (error) {
        dispatch({
            type: TMDB_FAIL,
            payload: "TMDB API Unavailable"
        })
    }
}

const changeList = (data) => async (dispatch) => {
    dispatch({
        type: CHANGE_MOVIES,
        payload: data
    })
}

const tmdbActions = {
    getList,
    changeList
}

export default tmdbActions;