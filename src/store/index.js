import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { createLogger } from 'redux-logger'

const initialState = {};
const middleware = [thunk];

let store = null
if (process.env.NODE_ENV === 'development') {
    store = createStore(
        rootReducer, 
        initialState, 
        compose(
            applyMiddleware(...middleware, createLogger()), 
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    )
} else {
    store = createStore(
        rootReducer, 
        initialState, 
        applyMiddleware(...middleware)
    )
}

export default store;
