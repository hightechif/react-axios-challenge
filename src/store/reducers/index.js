import { combineReducers } from "redux";
import authReducer from './authReducer';
import tmdbReducer from "./tmdbReducer";

export default combineReducers({
    auth: authReducer,
    tmdb: tmdbReducer
});