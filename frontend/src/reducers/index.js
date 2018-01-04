import { combineReducers } from 'redux';

import serverActivity from './serverActivityReducer';
import security from './securityReducer';

const rootReducer = combineReducers({
    serverActivity,
    security
});


export default rootReducer;