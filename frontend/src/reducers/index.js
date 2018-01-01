import { combineReducers } from 'redux';

const testReducer = (state = [], action) => {

    return state;
};

const rootReducer = combineReducers({
    testReducer
});


export default rootReducer;