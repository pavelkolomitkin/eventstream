import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import sessionListener from './listeners/sessionListener';

const configureStore = (initialState = {}) => {
    const result = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk)
        )
    );

    sessionListener(result);

    return result;
}

export default configureStore;