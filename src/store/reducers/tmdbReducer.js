import { FETCH_MOVIES, TMDB_FAIL, CHANGE_MOVIES } from "../actions/type";

const initialState = {
    items: [],
    total_results: 0,
    errorMessage: "",
    hasMore: true
}

const tmdbReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MOVIES:
            return {
                ...state,
                items: action.payload.data,
                total_results: action.payload.total_results,
                hasMore: (action.payload.data.length < action.payload.total_results),
                errorMessage: ""
            }
        case TMDB_FAIL:
            return {
                ...state,
                total_results: 0,
                errorMessage: action.payload
            }
        case CHANGE_MOVIES:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}

export default tmdbReducer;
