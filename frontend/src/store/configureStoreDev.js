import { createStore, applyMiddleware, compose } from 'redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import sessionListener from './listeners/sessionListener';

const history = createBrowserHistory();

const historyMiddleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState = {}) => {
    const result = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(historyMiddleware, thunk)
        )
    );
    sessionListener(result);


    return result;
}

export {configureStore, history};