import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const configureStore = (initialState = {}) => {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk)
        )
    );
}

export default configureStore;